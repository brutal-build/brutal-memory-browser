import { useStore } from '../store/useStore'
import { useMessages } from '../hooks/useMessages'
import { MessageBubble } from './MessageBubble'
import { BracketButton } from './shared/BracketButton'
import { exportSessionMd, downloadBlob } from '../utils/export'

export function ChatView() {
  const selectedSessionId = useStore((s) => s.selectedSessionId)
  const getSelectedSession = useStore((s) => s.getSelectedSession)
  const session = getSelectedSession()
  const { messages, loading } = useMessages(selectedSessionId)

  if (!selectedSessionId || !session) {
    return (
      <div className="flex items-center justify-center h-full text-white/30 text-sm font-mono">
        [ Select a session to view ]
      </div>
    )
  }

  const handleExportMd = () => {
    const md = exportSessionMd(session, messages)
    const blob = new Blob([md], { type: 'text/markdown' })
    downloadBlob(blob, `${(session.title || session.id).replace(/[^a-zA-Z0-9_-]/g, '_')}.md`)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-white font-bold font-mono text-sm">
            {session.title || '[ Untitled ]'}
          </div>
          <div className="text-xs text-white/40 font-mono mt-1">
            {messages.length} messages
          </div>
        </div>
        <BracketButton onClick={handleExportMd}>EXPORT MD</BracketButton>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4">
        {loading && (
          <div className="text-center text-white/40 text-sm font-mono py-8">
            Loading messages...
          </div>
        )}
        {!loading && messages.length === 0 && (
          <div className="text-center text-white/40 text-sm font-mono py-8">
            [ No messages ]
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  )
}
