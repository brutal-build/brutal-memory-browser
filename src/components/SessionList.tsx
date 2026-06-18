import { useMemo } from 'react'
import { useStore } from '../store/useStore'
import { SessionCard } from './SessionCard'

export function SessionList() {
  const getFilteredSessions = useStore((s) => s.getFilteredSessions)
  const selectedSessionId = useStore((s) => s.selectedSessionId)
  const setSelectedSessionId = useStore((s) => s.setSelectedSessionId)
  const sessions = useMemo(() => getFilteredSessions(), [getFilteredSessions])

  if (sessions.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-white/30 text-sm font-mono">
        [ No sessions found ]
      </div>
    )
  }

  return (
    <div className="overflow-y-auto flex-1">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isSelected={session.id === selectedSessionId}
          onClick={() => setSelectedSessionId(session.id)}
        />
      ))}
    </div>
  )
}
