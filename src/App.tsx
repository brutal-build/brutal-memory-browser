import { useState, useEffect, useCallback } from 'react'
import { useStore } from './store/useStore'
import { useSqlite } from './hooks/useSqlite'
import { DropZone } from './components/DropZone'
import { StatsBar } from './components/StatsBar'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import { SessionList } from './components/SessionList'
import { ChatView } from './components/ChatView'
import { SessionDetails } from './components/SessionDetails'
import { BracketButton } from './components/shared/BracketButton'
import { exportSessionsJson, exportAllMd, downloadBlob } from './utils/export'
import { MESSAGES_QUERY } from './utils/format'

function App() {
  const db = useStore((s) => s.db)
  const sessions = useStore((s) => s.sessions)
  const loading = useStore((s) => s.loading)
  const error = useStore((s) => s.error)
  const { loadWasm, openDb, wasmLoading, wasmError } = useSqlite()
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    loadWasm()
  }, [loadWasm])

  const handleFile = useCallback(async (file: File) => {
    await openDb(file)
  }, [openDb])

  const handleExportJson = () => {
    const json = exportSessionsJson(sessions)
    const blob = new Blob([json], { type: 'application/json' })
    downloadBlob(blob, 'sessions.json')
  }

  const handleExportAllMd = async () => {
    const loadMessagesForExport = async (sessionId: string) => {
      if (!db) return []
      const stmt = db.prepare(MESSAGES_QUERY)
      stmt.bind({ $sid: sessionId })
      const msgs: any[] = []
      while (stmt.step()) msgs.push(stmt.getAsObject())
      stmt.free()
      return msgs
    }
    const blob = await exportAllMd(sessions, loadMessagesForExport)
    downloadBlob(blob, 'all-sessions.zip')
  }

  if (!db) {
    return (
      <DropZone
        onFile={handleFile}
        loading={loading}
        error={error}
        wasmLoading={wasmLoading}
        wasmError={wasmError}
      />
    )
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col font-mono">
      {/* Top bar */}
      <div className="border-b-2 border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="text-white font-bold text-lg tracking-wider">
          {'{'}Brutal Memory Browser{'}'}
        </div>
        <div className="flex gap-2">
          <BracketButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'HIDE DETAILS' : 'DETAILS'}
          </BracketButton>
          <BracketButton onClick={handleExportJson}>EXPORT JSON</BracketButton>
          <BracketButton onClick={handleExportAllMd}>EXPORT ALL MD</BracketButton>
        </div>
      </div>

      <StatsBar />
      <SearchBar />
      <FilterBar />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - session list */}
        <div className="w-96 border-r-2 border-white/10 flex flex-col overflow-hidden">
          <SessionList />
        </div>

        {/* Main - chat view */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ChatView />
          </div>

          {/* Details panel */}
          {showDetails && (
            <div className="w-72 shrink-0">
              <SessionDetails />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
