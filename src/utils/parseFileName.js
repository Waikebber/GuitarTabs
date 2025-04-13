/**
 * Parses a filename to extract artist and song information
 * Handles both English and Japanese format names
 * @param {string} fileName - The filename to parse
 * @returns {Object} Parsed artist and song information
 */
function parseFileName(fileName) {
    // Remove .pdf extension
    const namePart = fileName.replace(".pdf", "");
  
    // Split artist and song by ' - '
    const [artistPart, songPart] = namePart.split(" - ").map((p) => p.trim());
  
    // Parse artist name
    let japaneseArtist = null;
    let englishArtist = null;
  
    const artistMatch = artistPart.match(/(.*?)\s*\((.*?)\)/);
    if (artistMatch) {
      japaneseArtist = artistMatch[1].trim();
      englishArtist = artistMatch[2].trim();
    } else {
      englishArtist = artistPart;
    }
  
    // Parse song name
    let japaneseSong = null;
    let englishSong = null;
  
    const songMatch = songPart?.match(/(.*?)\s*\((.*?)\)/);
    if (songMatch) {
      japaneseSong = songMatch[1].trim();
      englishSong = songMatch[2].trim();
    } else {
      englishSong = songPart;
    }
  
    return {
      artist: {
        japanese: japaneseArtist,
        english: englishArtist,
        display: japaneseArtist ? `${japaneseArtist} (${englishArtist})` : englishArtist,
      },
      song: {
        japanese: japaneseSong,
        english: englishSong,
        display: japaneseSong ? `${japaneseSong} (${englishSong})` : englishSong,
      },
      fileName,
    };
}

export default parseFileName;