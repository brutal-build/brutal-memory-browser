import { useMemo } from 'react'
import { useStore } from '../store/useStore'

export function useSources(): string[] {
  const sessions = useStore((s) => s.sessions)
  return useMemo(() => {
    const sources = new Set(sessions.map((s) => s.source))
    return Array.from(sources).sort()
  }, [sessions])
}
