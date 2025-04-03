# GitHub RPG Chrome Extension

A Chrome extension that gamifies your GitHub contributions with RPG elements! Level up as you contribute to repositories, earn XP for different actions, and unlock new titles.

## Features

- 🎮 RPG-style progression system
- 🏆 Level up and earn titles
- 📊 XP tracking for GitHub actions
- 🔔 Real-time notifications
- 🎨 Pixel-art UI design
- 📱 Responsive popup interface

## Tech Stack

- TypeScript
- Chrome Extension Manifest V3
- Pixel-art styling with CSS
- GitHub Events API

## Project Structure

```
github-rpg/
├── src/                    # Source files
│   ├── background/        # Background script
│   ├── content/          # Content script and styles
│   ├── popup/           # Popup UI and logic
│   ├── types/          # TypeScript type definitions
│   └── utils/         # Shared utilities
├── assets/            # Static assets
│   ├── icons/        # Extension icons
│   └── avatars/      # Character avatars
├── scripts/          # Build and utility scripts
├── dist/            # Compiled output
├── manifest.json    # Extension manifest
├── package.json    # Dependencies and scripts
└── tsconfig.json  # TypeScript configuration
```

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/github-rpg.git
   cd github-rpg
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory

## Development

1. Start the development build:
   ```bash
   npm run dev
   ```

2. The TypeScript compiler will watch for changes and rebuild automatically

3. Refresh the extension in Chrome to see your changes

## Usage

1. Click the extension icon in your Chrome toolbar to open the popup
2. Visit any GitHub page to start tracking your contributions
3. Earn XP for the following actions:
   - Opening Pull Requests (+10 XP)
   - Reviewing Pull Requests (+8 XP)
   - Commenting on Issues (+2 XP)
4. Level up and unlock new titles as you earn XP

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 