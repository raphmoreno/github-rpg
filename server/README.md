# GitHub RPG Mock Server

This is a simple Express.js server that simulates the GitHub API for local development of the GitHub RPG Chrome extension.

## Features

- Simulates GitHub events API
- Provides mock data for testing the extension
- CORS enabled for easy local development

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`.

## Development

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

- `GET /api/mock/users/:username/events` - Get mock GitHub events for a user
- `GET /api/users/:username` - Get user data
- `POST /api/xp` - Update user XP
- `POST /api/reset` - Reset user data (for testing)

## Testing with the Chrome Extension

To use this mock server with the extension:

1. Update the GitHub API URL in the extension code to point to `http://localhost:3000/api/mock` instead of `https://api.github.com`
2. Load the extension in Chrome
3. The extension will now use the mock server for GitHub API calls 