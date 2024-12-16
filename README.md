# Guitar Tabs Browser

A standalone web application for browsing and managing your local guitar tabs collection. This application provides a clean, simple interface to access your PDF guitar tabs organized by genre.

## Features

- Browse tabs organized by genre folders
- Track recently opened tabs
- Direct PDF viewing in browser
- No installation or server required
- Works completely offline
- Remembers recently opened files

## Setup

1. Create the following directory structure:
```
D:/GuitarTabs/
├── guitartabs.html
├── Blues/
│   └── your-blues-tabs.pdf
├── Rock/
│   └── your-rock-tabs.pdf
└── [Other Genre Folders]/
    └── other-tabs.pdf
```

2. Save `guitartabs.html` in the `D:/GuitarTabs` folder
3. Organize your PDF tabs into genre folders
4. Bookmark `file:///D:/GuitarTabs/guitartabs.html` in your browser

## First Use

1. Click your bookmark for `file:///D:/GuitarTabs/guitartabs.html`
2. When prompted, select the `D:/GuitarTabs` folder
3. Allow file system permissions when requested
4. You can now browse and open your tabs

## Directory Structure Requirements

- Main directory must be at `D:/GuitarTabs`
- Each genre should have its own folder
- Only PDF files are supported
- Folder names will be displayed as genre names

## Usage

### Home View
- Shows all genre folders
- Displays up to 5 recently opened tabs
- Click any genre to view its contents

### Genre View
- Lists all PDF files in the selected genre
- Click any file to open it in a new tab
- Use "Back to Genres" to return to main view

### Recent Files
- Shows the last 5 opened tabs
- Persists between browser sessions
- Click any recent file to reopen it

## Technical Requirements

### Browser Support
- Chrome (recommended)
- Edge
- Other Chromium-based browsers
- Not supported: Firefox, Safari

### Required Permissions
- File system access (granted once per session)
- Local file reading permissions
- Pop-up permissions for opening PDFs

## Troubleshooting

### File Access Issues
1. Make sure you've selected the correct directory (`D:/GuitarTabs`)
2. Allow file system permissions when prompted
3. Ensure PDFs are properly placed in genre folders

### File Not Found Errors
1. Verify the file still exists in the specified location
2. Check if the file has been moved to a different genre folder
3. Clear browser cache if issues persist

### Permission Errors
1. Click the lock icon in your browser's address bar
2. Verify file system permissions are granted
3. Try refreshing the page

## Limitations

- Works only with local files
- Requires modern browser with File System Access API support
- Must be located at `D:/GuitarTabs`
- Only supports PDF files
- Permissions must be re-granted each browser session

## Browser Settings

For optimal performance, ensure:
1. Pop-ups are allowed for PDF viewing
2. File system access is enabled
3. Local file access is permitted

## File Organization Tips

1. Use clear, descriptive folder names for genres
2. Keep PDF filenames consistent
3. Consider subgenres as separate folders
4. Regularly update and organize your collection

## Support

This is a standalone application with no external dependencies or support requirements. For issues:
1. Verify browser compatibility
2. Check file permissions
3. Ensure correct directory structure
4. Review troubleshooting steps above

## Future Improvements

While this is a standalone version, possible future enhancements could include:
- Support for additional file types
- Configurable directory location
- Search functionality
- Tab metadata display
- Custom genre ordering

## Credits

This is a standalone web application built with:
- React
- Chakra UI
- File System Access API
- Local Storage for recent files tracking