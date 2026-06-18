import { useStore } from '../store/useStore'
import { formatCount, formatTokens } from '../utils/format'

export function StatsBar() {
  const getStats = useStore((s) => s.getStats)
  const stats = getStats()

  return (
    <div className="border-b-2 border-white/10 px-6 py-3 text-sm font-mono text-white/80">
      <span className="text-white/50">{'//'} Stats</span>
      <span className="ml-4">[ {stats.totalSessions} sessions ]</span>
      <span className="ml-2">[ {formatCount(stats.totalMessages)} messages ]</span>
      <span className="ml-2">[ {formatTokens(stats.totalInputTokens)} in / {formatTokens(stats.totalOutputTokens)} out ]</span>
    </div>
  )
}
