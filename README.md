<div align="center">
  <h1>Brutal Memory Browser</h1>
</div>

<p align="center">
  <strong>Brutalist web app for browsing and exporting Hermes Agent conversations.</strong>
  <br />
  Built with React, Vite, and sql.js.
</p>

<p align="center">
  <a href="https://brutal-memory.vercel.app/">Live Demo</a> ·
  <a href="#features">Features</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#stack">Stack</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="build" />
  <img src="https://img.shields.io/badge/vite-6-blue" alt="vite" />
  <img src="https://img.shields.io/badge/react-19-blue" alt="react" />
  <img src="https://img.shields.io/badge/typescript-5-blue" alt="ts" />
  <img src="https://img.shields.io/badge/license-MIT-white" alt="license" />
</p>

---

## Overview

Brutal Memory Browser is a client-side web application that reads Hermes Agent's `state.db` SQLite database directly in your browser. Drop your database file and instantly browse, search, and export all your agent conversations — without uploading anything to a server.

**Everything runs locally. Your data never leaves your machine.**

## Features

- **Drop & Browse** — drag your `state.db` file or click to select
- **Session List** — all conversations sorted by date, with auto-generated titles
- **Search** — filter sessions by title with debounced input
- **Filters** — by source (tui, telegram, cron, discord), archived status, and sort order
- **Chat View** — properly formatted conversations with user, assistant, and tool messages
- **Session Details** — model, source, duration, token counts, tool calls, rewinds
- **Stats Bar** — total sessions, messages, and tokens at a glance
- **Export** — single session as `.md`, all sessions as `.json` or `.zip` of `.md` files

## Usage

```bash
git clone https://github.com/brutal-build/brutal-memory
cd brutal-memory
npm install
npm run dev
```

Or visit the live demo at [brutal-memory.vercel.app](https://brutal-memory.vercel.app).

1. Open the app
2. Drag your `state.db` file onto the page or click `[ SELECT FILE ]`
3. Browse, search, filter, and export your sessions

> **Your database stays in your browser. Nothing is uploaded.**

## Where is state.db?

| Platform | Location |
|---|---|
| Windows | `%LOCALAPPDATA%/hermes/profiles/<profile>/state.db` |
| macOS | `~/Library/Application Support/hermes/profiles/<profile>/state.db` |
| Linux | `~/.local/share/hermes/profiles/<profile>/state.db` |

## Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 6 | Build tooling |
| Tailwind CSS v4.3 | Styling |
| sql.js | SQLite in the browser (WebAssembly) |
| zustand | State management |
| JSZip | Export sessions as `.zip` |
| react-markdown | Render conversation content |

## Design

Brutalist monospace aesthetic — pure black background, white text, 2px borders, bracket-style `[ buttons ]`, zero border-radius, zero shadows, zero gradients.

## License

MIT — free to use, modify, and distribute.

---

<p align="center">
  <sub>Built by <a href="https://github.com/brutal-build">brutal-build</a></sub>
</p>
