import { useEffect, useState } from "react";

const useRecentFiles = () => {
  const [recentFiles, setRecentFiles] = useState([]);
  const RECENT_FILES_KEY = "recentGuitarTabs";
  const MAX_RECENT_FILES = 5;

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_FILES_KEY);
    if (stored) {
      setRecentFiles(JSON.parse(stored));
    }
  }, []);

  const addRecentFile = (file) => {
    const newRecent = [file, ...recentFiles.filter((rf) => rf.name !== file.name).slice(0, MAX_RECENT_FILES - 1)];
    setRecentFiles(newRecent);
    localStorage.setItem(RECENT_FILES_KEY, JSON.stringify(newRecent));
  };

  const clearRecentFiles = () => {
    setRecentFiles([]);
    localStorage.removeItem(RECENT_FILES_KEY);
  };

  return { recentFiles, addRecentFile, clearRecentFiles };
};


export default useRecentFiles;