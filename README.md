# GitHub RPG 🧙‍♂️

A Chrome extension that gamifies your GitHub contributions, turning your development activities into an RPG experience.

## Features

- 🎮 Earn XP for GitHub activities (PRs, reviews, comments)
- 🏆 Level up and earn new titles
- 🔔 Get toast notifications for XP gains
- 📊 Track your progress with a character sheet

## Installation

### Prerequisites
- Node.js (v14+)

### Setup

1. Clone this repository
```bash
git clone https://github.com/yourusername/github-rpg.git
cd github-rpg
```

2. Install dependencies
```bash
npm install
```

3. Build the extension
```bash
npm run build
```

4. Load the extension in Chrome
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the `dist` folder from this project

## Development

Start the development server with hot reloading:
```bash
npm run dev
```

## Usage

1. Click on the GitHub RPG extension icon in Chrome
2. View your character stats, level, and title
3. Perform actions on GitHub to earn XP:
   - Create a Pull Request: +10 XP
   - Review a Pull Request: +8 XP
   - Comment on an Issue: +2 XP

## Storage

The extension uses `chrome.storage.local` to store your progress locally. No account is required.

## License

MIT 