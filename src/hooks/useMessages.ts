import { useEffect, useState, useCallback } from 'react'
import { useStore } from '../store/useStore'
import type { Message } from '../types/db'

export function useMessages(sessionId: string | null) {
  const db = useStore((s) => s.db)
  const cacheMessages = useStore((s) => s.cacheMessages)
  const clearMessagesCache = useStore((s) => s.clearMessagesCache)
  const cached = useStore((s) => sessionId ? s.messagesCache[sessionId] : undefined)
  const setError = useStore((s) => s.setError)
  const [localLoading, setLocalLoading] = useState(false)

  const loadMessages = useCallback(async (sid: string) => {
    if (!db) return
    setLocalLoading(true)
    try {
      const stmt = db.prepare(`
        SELECT id, session_id, role, content, tool_calls, tool_name, timestamp, token_count, active
        FROM messages
        WHERE session_id = $sid AND active = 1
        ORDER BY timestamp ASC
      `)
      stmt.bind({ $sid: sid })

      const messages: Message[] = []
      while (stmt.step()) {
        const row = stmt.getAsObject() as any
        messages.push({
          id: row.id,
          session_id: row.session_id,
          role: row.role,
          content: row.content,
          tool_calls: row.tool_calls,
          tool_name: row.tool_name,
          timestamp: row.timestamp,
          token_count: row.token_count,
          active: row.active,
        })
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

  useEffect(() => {
    return () => {
      if (sessionId) clearMessagesCache(sessionId)
    }
  }, [sessionId, clearMessagesCache])

  return {
    messages: cached || [],
    loading: localLoading,
    reload: sessionId ? () => loadMessages(sessionId) : () => {},
  }
}
