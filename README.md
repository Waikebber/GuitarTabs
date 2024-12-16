# Guitar Tabs Browser

A modern web application for organizing and managing your local guitar tabs collection. This application provides a clean, intuitive interface for accessing PDF guitar tabs organized by genre, with support for external link management.

## Key Features

- 📁 Browse tabs organized by genre folders
- 🔗 Add and manage external tab links
- 📊 Visual genre-based organization
- 🕒 Track recently opened tabs
- 📱 Responsive design for all screen sizes
- 🔍 Direct PDF viewing in browser
- 💾 Works completely offline
- 🎸 Artist and song grouping
- 🌙 Dark mode interface

## Directory Structure

Create your tabs directory with the following structure:
```
GuitarTabs/
├── guitartabs.html
├── Blues/
│   ├── artist1-song1.pdf
│   └── artist2-song2.pdf
├── Rock/
│   └── artist3-song3.pdf
└── [Other Genre Folders]/
    └── your-tabs.pdf
```

### File Naming Convention

For better organization, use the following naming format:
- Single language: `Artist Name - Song Name.pdf`
- Dual language: `Japanese Name (English Name) - Song Name (Japanese Song).pdf`

## Setup Instructions

1. Download `guitartabs.html` to your chosen directory
2. Create genre folders (Blues, Rock, etc.)
3. Place PDF tabs in appropriate genre folders
4. Open `guitartabs.html` in a supported browser
5. Grant necessary permissions when prompted

## Usage Guide

### Managing Files

#### Local Files
- Organize PDFs into genre folders
- Files are automatically categorized by artist
- Recently opened files appear on home screen

#### External Links
- Add links to online tabs via the "Add Link" button
- Group links by genre and artist
- Edit or delete links as needed

### Navigation

1. **Home View**
   - Browse genres
   - Access recent tabs
   - Add new links

2. **Genre View**
   - See all artists in genre
   - View file count
   - Quick access to all tabs

3. **Artist View**
   - All songs by artist
   - PDF and link management
   - Edit/delete capabilities

## Technical Requirements

### Supported Browsers
✅ Google Chrome
✅ Microsoft Edge
✅ Other Chromium-based browsers
❌ Firefox
❌ Safari

### Required Permissions
- File System Access API
- Local file reading
- Pop-up permissions (for PDF viewing)

## Advanced Features

### Link Management
- Add external tab links
- Organize links by genre/artist
- Edit link details
- Delete outdated links

### Recent Files Tracking
- Automatic history tracking
- Quick access to recent tabs
- Persistent between sessions

### File Organization
- Automatic artist/song parsing
- Support for dual-language names
- Genre-based categorization

## Troubleshooting

### Common Issues

1. **Permission Errors**
   - Refresh the page
   - Re-grant permissions
   - Check browser settings

2. **Files Not Loading**
   - Verify file location
   - Check file permissions
   - Ensure PDF format

3. **Browser Compatibility**
   - Use Chrome or Edge
   - Enable required permissions
   - Allow pop-ups

### Best Practices

- Keep consistent file naming
- Organize tabs by genre
- Regularly backup your collection
- Use clear folder names

## Limitations

- PDF files only
- Modern browser required
- Permissions reset on session end
- Local files only

## Future Roadmap

Planned improvements:
- Search functionality
- Tag support
- Multiple file types
- Custom themes
- Export/import capability
- Mobile app version

## Browser Settings

For optimal performance:

1. **Chrome/Edge Settings**
   - Enable File System Access
   - Allow pop-ups
   - Grant local file access

2. **Permissions**
   - File system: Allow
   - Pop-ups: Allow
   - Local files: Allow

## Support

This is a standalone application. For issues:
1. Check browser compatibility
2. Verify file permissions
3. Review troubleshooting steps
4. Ensure correct file structure

## Development

Built with:
- React for UI
- Chakra UI for styling
- File System Access API
- Local Storage API

## License

MIT License - Feel free to modify and distribute as needed.