import { create } from 'zustand'
import type { Session, Message, SessionStats, SortMode } from '../types/db'

interface AppState {
  db: any | null
  sessions: Session[]
  messagesCache: Record<string, Message[]>
  selectedSessionId: string | null
  loading: boolean
  error: string | null

  // UI state
  searchQuery: string
  showArchived: boolean
  sourceFilter: string
  sortMode: SortMode

  // Actions
  setDb: (db: any) => void
  setSessions: (sessions: Session[]) => void
  cacheMessages: (sessionId: string, messages: Message[]) => void
  clearMessagesCache: (sessionId: string) => void
  setSelectedSessionId: (id: string | null) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
  setSearchQuery: (q: string) => void
  setShowArchived: (v: boolean) => void
  setSourceFilter: (f: string) => void
  setSortMode: (m: SortMode) => void

  // Derived
  getFilteredSessions: () => Session[]
  getStats: () => SessionStats
  getSelectedSession: () => Session | null
  getMessagesForSelected: () => Message[]
}

export const useStore = create<AppState>((set, get) => ({
  db: null,
  sessions: [],
  messagesCache: {},
  selectedSessionId: null,
  loading: false,
  error: null,
  searchQuery: '',
  showArchived: false,
  sourceFilter: 'all',
  sortMode: 'newest',

  setDb: (db) => set({ db }),
  setSessions: (sessions) => set({ sessions }),
  cacheMessages: (sessionId, messages) =>
    set((s) => ({ messagesCache: { ...s.messagesCache, [sessionId]: messages } })),
  clearMessagesCache: (sessionId) =>
    set((s) => {
      const { [sessionId]: _, ...rest } = s.messagesCache
      return { messagesCache: rest }
    }),
  setSelectedSessionId: (id) => set({ selectedSessionId: id }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setShowArchived: (showArchived) => set({ showArchived }),
  setSourceFilter: (sourceFilter) => set({ sourceFilter }),
  setSortMode: (sortMode) => set({ sortMode }),

  getFilteredSessions: () => {
    const { sessions, searchQuery, showArchived, sourceFilter, sortMode } = get()
    let filtered = sessions

    if (!showArchived) {
      filtered = filtered.filter((s) => s.archived === 0)
    }
    if (sourceFilter !== 'all') {
      filtered = filtered.filter((s) => s.source === sourceFilter)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter((s) => {
        const title = (s.title || '').toLowerCase()
        if (title.includes(q)) return true
        return false
      })
    }

    // Sort
    filtered = [...filtered]
    switch (sortMode) {
      case 'newest':
        filtered.sort((a, b) => b.started_at - a.started_at)
        break
      case 'oldest':
        filtered.sort((a, b) => a.started_at - b.started_at)
        break
      case 'most_messages':
        filtered.sort((a, b) => b.message_count - a.message_count)
        break
      case 'most_tokens':
        filtered.sort((a, b) => (b.input_tokens + b.output_tokens) - (a.input_tokens + a.output_tokens))
        break
    }

    return filtered
  },

  getStats: () => {
    const sessions = get().getFilteredSessions()
    let totalMessages = 0
    let totalInputTokens = 0
    let totalOutputTokens = 0

    for (const s of sessions) {
      totalMessages += s.message_count
      totalInputTokens += s.input_tokens
      totalOutputTokens += s.output_tokens
    }

    return {
      totalSessions: sessions.length,
      totalMessages,
      totalTokens: totalInputTokens + totalOutputTokens,
      totalInputTokens,
      totalOutputTokens,
    }
  },

  getSelectedSession: () => {
    const { sessions, selectedSessionId } = get()
    if (!selectedSessionId) return null
    return sessions.find((s) => s.id === selectedSessionId) || null
  },

  getMessagesForSelected: () => {
    const { messagesCache, selectedSessionId } = get()
    if (!selectedSessionId) return []
    return messagesCache[selectedSessionId] || []
  },
}))
