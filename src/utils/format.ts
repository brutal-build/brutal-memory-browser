export function formatDate(ts: number): string {
  const d = new Date(ts * 1000)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = d.getDate()
  const mon = months[d.getMonth()]
  const year = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${day} ${mon} ${year}, ${hh}:${mm}`
}

export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function formatDuration(start: number, end: number): string {
  const secs = Math.round(end - start)
  if (secs < 60) return `${secs}s`
  const mins = Math.floor(secs / 60)
  const rem = secs % 60
  if (mins < 60) return `${mins}m ${rem}s`
  const hrs = Math.floor(mins / 60)
  const rm = mins % 60
  return `${hrs}h ${rm}m`
}

export function formatCount(n: number): string {
  return n.toLocaleString()
}

export function extractTextContent(content: string): string {
  if (!content) return ''
  try {
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed)) {
      return parsed
        .map((part: any) => part.text || part.content || '')
        .filter(Boolean)
        .join('\n')
    }
    if (typeof parsed === 'object') {
      return parsed.text || parsed.content || JSON.stringify(parsed)
    }
    return String(parsed)
  } catch {
    return content
  }
}

export const MESSAGES_QUERY = `
  SELECT id, session_id, role, content, tool_calls, tool_name, timestamp, token_count, active
  FROM messages
  WHERE session_id = $sid AND active = 1
  ORDER BY timestamp ASC
`

export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50)
}
