import { useStore } from '../store/useStore'
import { formatDate, formatDuration, formatTokens, formatCount } from '../utils/format'

export function SessionDetails() {
  const session = useStore((s) => s.getSelectedSession())

  if (!session) return null

  const rewinds = session.tool_call_count // approx

  return (
    <div className="border-l-2 border-white/10 p-6 text-sm font-mono space-y-3">
      <div className="text-white/50 text-xs mb-4">{'//'} Session Info</div>

      <div>
        <span className="text-white/40">[ Model ]</span>
        <span className="ml-2 text-white/80">{session.model}</span>
      </div>
      <div>
        <span className="text-white/40">[ Source ]</span>
        <span className="ml-2 text-white/80">{session.source}</span>
      </div>
      <div>
        <span className="text-white/40">[ Started ]</span>
        <span className="ml-2 text-white/80">{formatDate(session.started_at)}</span>
      </div>
      {session.ended_at && (
        <div>
          <span className="text-white/40">[ Duration ]</span>
          <span className="ml-2 text-white/80">{formatDuration(session.started_at, session.ended_at)}</span>
        </div>
      )}
      <div>
        <span className="text-white/40">[ Messages ]</span>
        <span className="ml-2 text-white/80">{formatCount(session.message_count)}</span>
      </div>
      <div>
        <span className="text-white/40">[ Tokens in ]</span>
        <span className="ml-2 text-white/80">{formatTokens(session.input_tokens)}</span>
      </div>
      <div>
        <span className="text-white/40">[ Tokens out ]</span>
        <span className="ml-2 text-white/80">{formatTokens(session.output_tokens)}</span>
      </div>
      <div>
        <span className="text-white/40">[ Tool calls ]</span>
        <span className="ml-2 text-white/80">{session.tool_call_count}</span>
      </div>
      <div>
        <span className="text-white/40">[ Rewinds ]</span>
        <span className="ml-2 text-white/80">{rewinds}</span>
      </div>
    </div>
  )
}
