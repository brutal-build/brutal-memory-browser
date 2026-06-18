import { useMemo } from 'react'
import { useStore } from '../store/useStore'
import type { Session } from '../types/db'

export function useSessions(): Session[] {
  const getFilteredSessions = useStore((s) => s.getFilteredSessions)
  return useMemo(() => getFilteredSessions(), [getFilteredSessions])
}

export function useSources(): string[] {
  const sessions = useStore((s) => s.sessions)
  return useMemo(() => {
    const sources = new Set(sessions.map((s) => s.source))
    return Array.from(sources).sort()
  }, [sessions])
}
