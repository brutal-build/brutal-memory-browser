# Brutal Memory Browser

A **brutalist** web app for browsing and exporting conversations from Hermes Agent's `state.db` SQLite database. Everything runs in your browser — zero backend, zero uploads.

![build](https://img.shields.io/badge/build-passing-brightgreen) ![vite](https://img.shields.io/badge/vite-6-blue) ![react](https://img.shields.io/badge/react-19-blue) ![ts](https://img.shields.io/badge/typescript-5-blue)

---

## Features

- **Drop & Browse** — drag your `state.db` file into the browser, instantly see all sessions
- **Full-text Search** — filter sessions by title with 300ms debounced input
- **Filters & Sorting** — archived toggle, source filter (tui, telegram, cron, etc.), sort by date / messages / tokens
- **Session Details** — model, source, duration, token usage, tool calls, rewinds
- **Chat View** — render user / assistant / tool messages with structured content extraction
- **Export** — single session as `.md`, all sessions as `.json`, all sessions as `.zip` of `.md` files
- **100% Client-side** — sql.js WASM in the browser, your data never leaves your machine
- **Brutalist Design** — monochrome black & white, `border-2`, `[ bracket buttons ]`, zero border-radius

---

## Stack

| Technology | Purpose |
|---|---|
| [Vite 6](https://vitejs.dev/) | Build tool (downgraded for Node 20.18 compatibility) |
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4.3](https://tailwindcss.com/) | Utility CSS |
| [sql.js](https://sql.js.org/) | SQLite WASM — reads `.db` in the browser |
| [zustand](https://github.com/pmndrs/zustand) | State management |
| [lucide-react](https://lucide.dev/) | Icons |
| [JSZip](https://stuk.github.io/jszip/) | ZIP file export |

---

## How to Use

### 1. Online (Vercel)

Visit the live app at:

**https://brutal-memory-browser.vercel.app**

No installation needed. Just drag your `state.db` file into the browser.

### 2. Local Development

```bash
git clone https://github.com/brutal-build/brutal-memory-browser.git
cd brutal-memory-browser
npm install
npm run dev
```

Open `http://localhost:5173` and drag your `state.db` in.

### 3. Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy anywhere (Vercel, Netlify, GitHub Pages, etc.).

---

## Where to Find `state.db`

Your Hermes Agent session database is located at:

| Platform | Path |
|---|---|
| Hermes Desktop (default profile) | `~/.hermes/state.db` |
| Hermes Desktop (custom profile) | `~/.hermes/profiles/<profile>/state.db` |
| Hermes CLI (default profile) | `~/.hermes/state.db` |

---

## Database Schema

The app reads from two tables in `state.db`:

### `sessions`

| Column | Type | Description |
|---|---|---|
| `id` | TEXT | Session UUID |
| `title` | TEXT | Session title (nullable) |
| `source` | TEXT | Platform (tui, telegram, etc.) |
| `model` | TEXT | AI model used |
| `started_at` | REAL | Unix timestamp |
| `ended_at` | REAL | Unix timestamp or NULL |
| `message_count` | INTEGER | Number of messages |
| `tool_call_count` | INTEGER | Number of tool calls |
| `input_tokens` | INTEGER | Prompt tokens |
| `output_tokens` | INTEGER | Completion tokens |
| `archived` | INTEGER | 0 = active, 1 = archived |

### `messages`

| Column | Type | Description |
|---|---|---|
| `id` | INTEGER | Primary key |
| `session_id` | TEXT | FK to sessions |
| `role` | TEXT | user, assistant, or tool |
| `content` | TEXT | Message content (JSON) |
| `tool_calls` | TEXT | Tool call JSON |
| `tool_name` | TEXT | Tool name (for tool messages) |
| `timestamp` | REAL | Unix timestamp |
| `token_count` | INTEGER | Tokens in this message |
| `active` | INTEGER | 1 = active, 0 = compressed/deleted |

---

## Project Structure

```
brutal-memory-browser/
├── public/
│   └── favicon.svg
├── src/
│   ├── types/db.ts              # TypeScript types for sessions & messages
│   ├── store/useStore.ts        # Zustand store (DB, sessions, cache, UI state)
│   ├── hooks/
│   │   ├── useSqlite.ts         # sql.js WASM loader + DB opener
│   │   ├── useSessions.ts       # Filtered session list + sources
│   │   └── useMessages.ts       # Lazy message loader per session
│   ├── utils/
│   │   ├── format.ts            # Date, token, duration formatting + content extraction
│   │   └── export.ts            # MD / JSON / ZIP export with download
│   └── components/
│       ├── shared/              # BracketButton, BracketTag (brutalist UI primitives)
│       ├── DropZone.tsx          # Drag & drop file upload
│       ├── StatsBar.tsx          # "// Stats [ 40 sessions ] [ 2,557 msgs ]"
│       ├── SearchBar.tsx         # Debounced search input
│       ├── FilterBar.tsx         # Archived toggle, source filter, sort selector
│       ├── SessionList.tsx       # Scrollable session list
│       ├── SessionCard.tsx       # Individual session (memoized)
│       ├── SessionDetails.tsx    # Right sidebar with session metadata
│       ├── ChatView.tsx          # Conversation viewer with export
│       └── MessageBubble.tsx     # User/assistant/tool message (memoized)
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Design Philosophy

**Brutalist** — inspired by the Hermes Agent's own brutalist aesthetic:

- Background: `#000` (pure black)
- Text: `#fff` (pure white), monospace (`'Courier New', Courier`)
- Borders: `2px solid rgba(255,255,255,0.2)` — **zero border-radius**
- Buttons: `[ Button ]` with hover invert (white bg, black text)
- Sections: prefixed with `{'//'}`
- No shadows, no gradients, no glassmorphism
- Accent: white only (red for errors)
- Narrow 6px scrollbar, white on black

---

## Future Ideas

- [ ] PWA support with service worker
- [ ] Full-text search via FTS5 (custom sql.js build)
- [ ] Message search within session
- [ ] Dark/light toggle (ironic for a black-on-white app)
- [ ] Virtual scrolling for 10k+ sessions
- [ ] Session comparison side-by-side

---

## License

MIT
