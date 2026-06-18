import { memo } from 'react'
import type { Message } from '../types/db'
import { extractTextContent, formatTokens } from '../utils/format'
import { BracketTag } from './shared/BracketTag'

interface Props {
  message: Message
}

export const MessageBubble = memo(function MessageBubble({ message }: Props) {
  const content = extractTextContent(message.content)

  if (message.role === 'tool') {
    return (
      <div className="py-2 px-4 mx-6">
        <div className="text-xs text-white/40 font-mono flex items-center gap-2">
          <span className="text-white/30">{'//'}</span>
          <BracketTag>{message.tool_name || 'tool'}</BracketTag>
          {message.token_count > 0 && (
            <span className="text-white/30">{formatTokens(message.token_count)}</span>
          )}
        </div>
        <div className="mt-1 text-xs text-white/50 font-mono whitespace-pre-wrap line-clamp-3">
          {content.length > 200 ? content.slice(0, 200) + ' [ … ]' : content}
        </div>
      </div>
    )
  }

  const isUser = message.role === 'user'

  return (
    <div className={`py-3 px-6 ${isUser ? 'pr-16' : 'pl-16'}`}>
      <div className="text-xs text-white/30 font-mono mb-1">
        {isUser ? '[ user ]' : '[ assistant ]'}
        {message.token_count > 0 && (
          <span className="ml-2 text-white/20">{formatTokens(message.token_count)}</span>
        )}
      </div>
      <div
        className={`font-mono text-sm whitespace-pre-wrap break-words
          ${isUser
            ? 'border-2 border-white/20 bg-white/5 text-white p-4'
            : 'border-2 border-white/10 bg-white/[0.03] text-white/90 p-4'
          }`}
      >
        {content}
      </div>
    </div>
  )
})
