import { useEffect, useState } from "react";

const dbName = "guitarTabsDB";
const storeName = "directoryHandle";
const version = 1;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
  });
};

const storeDirectoryHandle = async (handle) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  await store.put(handle, "dirHandle");
};

const getStoredDirectoryHandle = async () => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  return store.get("dirHandle");
};

const verifyPermission = async (fileHandle, readWrite) => {
  const options = { mode: readWrite ? "readwrite" : "read" };
  if ((await fileHandle.queryPermission(options)) === "granted") return true;
  if ((await fileHandle.requestPermission(options)) === "granted") return true;
  return false;
};

export const useFileSystem = () => {
  const [rootHandle, setRootHandle] = useState(null);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);

  const loadLinks = async (dirHandle) => {
    try {
      let linksHandle;
      try {
        linksHandle = await dirHandle.getFileHandle("links.json");
      } catch {
        linksHandle = await dirHandle.getFileHandle("links.json", { create: true });
        const writable = await linksHandle.createWritable();
        await writable.write(JSON.stringify({}));
        await writable.close();
      }
      const file = await linksHandle.getFile();
      const content = await file.text();
      return content ? JSON.parse(content) : {};
    } catch (err) {
      console.error("Error loading links:", err);
      return {};
    }
  };

  const saveLinks = async (dirHandle, links) => {
    try {
      const linksHandle = await dirHandle.getFileHandle("links.json", { create: true });
      const writable = await linksHandle.createWritable();
      await writable.write(JSON.stringify(links, null, 2));
      await writable.close();
      return true;
    } catch (err) {
      console.error("Error saving links:", err);
      return false;
    }
  };

  const loadDirectory = async (dirHandle) => {
    try {
      const genresList = [];
      const links = await loadLinks(dirHandle);

      for await (const entry of dirHandle.values()) {
        if (entry.kind === "directory" && entry.name !== ".git") {
          const files = [];
          for await (const fileEntry of entry.values()) {
            if (fileEntry.kind === "file" && fileEntry.name.endsWith(".pdf")) {
              files.push({ name: fileEntry.name, handle: fileEntry, genre: entry.name, isPdf: true });
            }
          }
          if (files.length > 0) {
            genresList.push({ name: entry.name, handle: entry, files });
          }
        }
      }

      for (const genre in links) {
        const hasLinks = Object.keys(links[genre]).some((artist) => Object.keys(links[genre][artist]).length > 0);
        if (!hasLinks) continue;

        let genreEntry = genresList.find((g) => g.name === genre);
        if (!genreEntry) {
          try {
            const newFolderHandle = await dirHandle.getDirectoryHandle(genre, { create: true });
            genreEntry = { name: genre, handle: newFolderHandle, files: [] };
            genresList.push(genreEntry);
          } catch (err) {
            console.error(`Error creating folder for genre ${genre}:`, err);
            continue;
          }
        }

        for (const artist in links[genre]) {
          for (const song in links[genre][artist]) {
            genreEntry.files.push({
              name: `${artist} - ${song}`,
              url: links[genre][artist][song],
              genre,
              artist,
              song,
              isLink: true,
            });
          }
        }
      }

      const nonEmptyGenres = genresList.filter((genre) => genre.files.length > 0);
      setGenres(nonEmptyGenres.sort((a, b) => a.name.localeCompare(b.name)));
      setError(null);
    } catch (err) {
      console.error("Error loading directory:", err);
      setError("Failed to load genres and files");
    }
  };

  useEffect(() => {
    const restoreAccess = async () => {
      try {
        const handle = await getStoredDirectoryHandle();
        if (handle && await verifyPermission(handle, true)) {
          try {
            await handle.values().next();
            await loadDirectory(handle);
            setRootHandle(handle);
            setShowPermissionDialog(false);
          } catch {
            setShowPermissionDialog(true);
          }
        } else {
          setShowPermissionDialog(true);
        }
      } catch {
        setShowPermissionDialog(true);
      }
    };
    restoreAccess();
  }, []);

  const initializeDirectory = async () => {
    try {
      const handle = await window.showDirectoryPicker({ mode: "readwrite" });
      if (await verifyPermission(handle, true)) {
        await storeDirectoryHandle(handle);
        await loadDirectory(handle);
        setRootHandle(handle);
        setShowPermissionDialog(false);
      } else {
        setError("Permission denied for directory");
        setShowPermissionDialog(true);
      }
    } catch (err) {
      console.error("Directory access error:", err);
      setError("Failed to access directory");
    }
  };

  const deleteLink = async (dirHandle, genre, artist, song) => {
    try {
      const links = await loadLinks(dirHandle);
      if (links[genre]?.[artist]?.[song]) {
        delete links[genre][artist][song];
        if (Object.keys(links[genre][artist]).length === 0) delete links[genre][artist];
        if (Object.keys(links[genre]).length === 0) delete links[genre];
        if (await saveLinks(dirHandle, links)) {
          await loadDirectory(dirHandle);
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error("Error deleting link:", err);
      return false;
    }
  };

  const updateLink = async (dirHandle, oldData, newData) => {
    try {
      const links = await loadLinks(dirHandle);
      if (links[oldData.genre]?.[oldData.artist]?.[oldData.song]) {
        delete links[oldData.genre][oldData.artist][oldData.song];
      }
      if (!links[newData.genre]) links[newData.genre] = {};
      if (!links[newData.genre][newData.artist]) links[newData.genre][newData.artist] = {};
      links[newData.genre][newData.artist][newData.song] = newData.url;
      if (await saveLinks(dirHandle, links)) {
        await loadDirectory(dirHandle);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating link:", err);
      return false;
    }
  };

  return {
    rootHandle,
    genres,
    initializeDirectory,
    error,
    showPermissionDialog,
    loadLinks,
    saveLinks,
    loadDirectory,
    deleteLink,
    updateLink,
  };
};

export default useFileSystem;