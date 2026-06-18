import type { Session, Message } from '../types/db'
import { formatDate, extractTextContent, sanitizeFilename } from './format'

function sessionToMd(session: Session, messages: Message[]): string {
  const lines: string[] = []
  lines.push(`# ${session.title || 'Untitled Session'}`)
  lines.push(`Date: ${formatDate(session.started_at)}`)
  lines.push(`Model: ${session.model}`)
  lines.push(`Messages: ${messages.length}`)
  lines.push(`Source: ${session.source}`)
  lines.push('---')
  lines.push('')

  for (const msg of messages) {
    const role = msg.role.toUpperCase()
    lines.push(`## ${role}`)
    if (msg.role === 'tool' && msg.tool_name) {
      lines.push(`*Tool: ${msg.tool_name}*`)
    }
    const text = extractTextContent(msg.content)
    lines.push('')
    lines.push(text)
    lines.push('')
  }

  return lines.join('\n')
}

export { sessionToMd as exportSessionMd }

export function exportSessionsJson(sessions: Session[]): string {
  return JSON.stringify(sessions, null, 2)
}

export async function exportAllMd(sessions: Session[], getMessages: (id: string) => Promise<Message[]>): Promise<Blob> {
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()

  for (const session of sessions) {
    const messages = await getMessages(session.id)
    const md = sessionToMd(session, messages)
    const safeName = sanitizeFilename(session.title || session.id)
    zip.file(`${safeName}.md`, md)
  }

  return zip.generateAsync({ type: 'blob' })
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
