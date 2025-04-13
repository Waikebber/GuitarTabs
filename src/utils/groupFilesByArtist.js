import parseFileName from "./parseFileName.js";

/**
 * Groups files by artist and organizes them into a structured format
 * Sorts artists by number of songs (descending) and then alphabetically
 * @param {Array} files - Array of file objects to group
 * @returns {Array} Grouped files organized by artist
 */
function groupFilesByArtist(files) {
  const artistMap = new Map();

  files.forEach((file) => {
    const parsedFile = parseFileName(file.name);

    const artistKey = parsedFile.artist.display;
    if (!artistMap.has(artistKey)) {
      artistMap.set(artistKey, {
        artist: parsedFile.artist,
        songs: [],
      });
    }

    artistMap.get(artistKey).songs.push({
      ...parsedFile.song,
      fileName: file.name,
      handle: file.handle,
      url: file.url,
      isLink: file.isLink,
      genre: file.genre,
      artist: file.artist,
      song: file.song,
    });
  });

  // Convert to array and sort
  return Array.from(artistMap.values())
    .map((entry) => ({
      ...entry,
      songs: entry.songs.sort((a, b) => a.display.localeCompare(b.display)),
    }))
    .sort((a, b) => {
      const diff = b.songs.length - a.songs.length;
      return diff === 0
        ? a.artist.display.localeCompare(b.artist.display)
        : diff;
    });
}

export default groupFilesByArtist;