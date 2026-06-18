import { useStore } from '../store/useStore'
import { useSources } from '../hooks/useSessions'
import type { SortMode } from '../types/db'

export function FilterBar() {
  const showArchived = useStore((s) => s.showArchived)
  const setShowArchived = useStore((s) => s.setShowArchived)
  const sourceFilter = useStore((s) => s.sourceFilter)
  const setSourceFilter = useStore((s) => s.setSourceFilter)
  const sortMode = useStore((s) => s.sortMode)
  const setSortMode = useStore((s) => s.setSortMode)
  const sources = useSources()

  return (
    <div className="border-b-2 border-white/10 px-6 py-3 flex flex-wrap items-center gap-4 text-sm font-mono">
      {/* Archive toggle */}
      <label className="flex items-center gap-2 text-white/70 cursor-pointer">
        <input
          type="checkbox"
          checked={showArchived}
          onChange={(e) => setShowArchived((e.target as HTMLInputElement).checked)}
          className="accent-white"
        />
        Show archived
      </label>

      {/* Source filter */}
      <select
        value={sourceFilter}
        onChange={(e) => setSourceFilter((e.target as HTMLSelectElement).value)}
        className="bg-black border-2 border-white/20 text-white px-2 py-1 text-xs"
      >
        <option value="all">all sources</option>
        {sources.map((src) => (
          <option key={src} value={src}>{src}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortMode}
        onChange={(e) => setSortMode((e.target as HTMLSelectElement).value as SortMode)}
        className="bg-black border-2 border-white/20 text-white px-2 py-1 text-xs"
      >
        <option value="newest">newest</option>
        <option value="oldest">oldest</option>
        <option value="most_messages">most messages</option>
        <option value="most_tokens">most tokens</option>
      </select>
    </div>
  )
}
