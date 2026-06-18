import { useEffect, useState, useCallback } from 'react'
import { useStore } from '../store/useStore'
import type { Message } from '../types/db'
import { MESSAGES_QUERY } from '../utils/format'

export function useMessages(sessionId: string | null) {
  const db = useStore((s) => s.db)
  const cacheMessages = useStore((s) => s.cacheMessages)
  const cached = useStore((s) => sessionId ? s.messagesCache[sessionId] : undefined)
  const setError = useStore((s) => s.setError)
  const [localLoading, setLocalLoading] = useState(false)

  const loadMessages = useCallback(async (sid: string) => {
    if (!db) return
    setLocalLoading(true)
    try {
      const stmt = db.prepare(MESSAGES_QUERY)
      stmt.bind({ $sid: sid })

      const messages: Message[] = []
      while (stmt.step()) {
        const row = stmt.getAsObject()
        messages.push({ ...row } as unknown as Message)
      }
      stmt.free()

      cacheMessages(sid, messages)
    } catch (err: any) {
      setError(err.message || 'Failed to load messages')
    } finally {
      setLocalLoading(false)
    }
  }, [db, cacheMessages, setError])

  useEffect(() => {
    if (!sessionId) return
    if (cached) return
    loadMessages(sessionId)
  }, [sessionId, cached, loadMessages])

  return {
    messages: cached || [],
    loading: localLoading,
    reload: sessionId ? () => loadMessages(sessionId) : () => {},
  }
}
