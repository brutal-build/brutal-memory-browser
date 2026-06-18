# Brutal Memory

A **brutalist** web app for browsing and exporting conversations from Hermes Agent's `state.db` SQLite database. Everything runs in your browser — zero backend, zero uploads.

![build](https://img.shields.io/badge/build-passing-brightgreen) ![vite](https://img.shields.io/badge/vite-6-blue) ![react](https://img.shields.io/badge/react-19-blue) ![ts](https://img.shields.io/badge/typescript-5-blue)

## Features

- **Drop & Browse** — drag your `state.db` file into the browser
- **Session List** — all conversations sorted by date
- **Search** — filter sessions by title with debounced input
- **Filters** — source (tui, telegram, cron, discord…), archived status, sort order
- **Chat View** — read conversations with proper formatting
- **Session Details** — model, source, duration, token counts, tool calls
- **Export** — single session as `.md`, all sessions as `.json` or `.zip` of `.md` files

## Stack

- Vite 6 + React 19 + TypeScript
- Tailwind CSS v4.3
- sql.js (SQLite compiled to WebAssembly)
- zustand (state management)
- JSZip (export all sessions as .zip)
- Hosted on Vercel

## Design

Minimalist monospace — black background, white text, 2px borders, bracket-style buttons, zero border-radius.

## Usage

```
git clone https://github.com/brutal-build/brutal-memory
cd brutal-memory
npm install
npm run dev
```

Or visit the live demo: [brutal-memory.vercel.app](https://brutal-memory.vercel.app)

1. Open the app
2. Click `[ SELECT FILE ]` or drag your `state.db` file onto the page
3. Browse your sessions

> Your database stays in your browser. Nothing is uploaded.

## Where is state.db?

| Platform | Location |
|----------|----------|
| Windows | `%LOCALAPPDATA%/hermes/profiles/<profile>/state.db` |
| macOS | `~/Library/Application Support/hermes/profiles/<profile>/state.db` |
| Linux | `~/.local/share/hermes/profiles/<profile>/state.db` |

## License

MIT
