export interface Session {
  id: string
  title: string | null
  source: string
  model: string
  started_at: number
  ended_at: number | null
  message_count: number
  tool_call_count: number
  input_tokens: number
  output_tokens: number
  archived: number
}

export interface Message {
  id: number
  session_id: string
  role: 'user' | 'assistant' | 'tool'
  content: string
  tool_calls: string | null
  tool_name: string | null
  timestamp: number
  token_count: number
  active: number
}

export interface SessionStats {
  totalSessions: number
  totalMessages: number
  totalTokens: number
  totalInputTokens: number
  totalOutputTokens: number
}

export type SortMode = 'newest' | 'oldest' | 'most_messages' | 'most_tokens'
