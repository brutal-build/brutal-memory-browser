import { memo } from 'react'
import type { Session } from '../types/db'
import { formatDate, formatTokens, formatDuration, formatCount } from '../utils/format'
import { BracketTag } from './shared/BracketTag'

interface Props {
  session: Session
  isSelected: boolean
  onClick: () => void
}

export const SessionCard = memo(function SessionCard({ session, isSelected, onClick }: Props) {
  return (
    <div
      className={`border-b-2 border-white/10 px-6 py-4 cursor-pointer font-mono text-sm
        hover:bg-white/5 transition-colors duration-100
        ${isSelected ? 'bg-white/10 border-l-2 border-l-white' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold truncate">
            {session.title || '[ Untitled ]'}
          </div>
          <div className="text-white/50 text-xs mt-1">{formatDate(session.started_at)}</div>
        </div>
        <div className="flex flex-wrap gap-1.5 shrink-0">
          <BracketTag>{formatCount(session.message_count)} msgs</BracketTag>
          <BracketTag>{formatTokens(session.input_tokens)} in / {formatTokens(session.output_tokens)} out</BracketTag>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 text-xs">
        <BracketTag>{session.source}</BracketTag>
        {session.model && <BracketTag className="text-white/40">{session.model}</BracketTag>}
        {session.ended_at && (
          <BracketTag>{formatDuration(session.started_at, session.ended_at)}</BracketTag>
        )}
      </div>
    </div>
  )
})
