import { useStore } from '../store/useStore'
import { useRef } from 'react'

export function SearchBar() {
  const searchQuery = useStore((s) => s.searchQuery)
  const setSearchQuery = useStore((s) => s.setSearchQuery)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setSearchQuery(val)
    }, 300)
  }

  return (
    <div className="px-6 py-3">
      <input
        type="text"
        placeholder="[ SEARCH... ]"
        defaultValue={searchQuery}
        onChange={handleChange}
        className="w-full bg-black border-2 border-white/20 text-white font-mono text-sm px-4 py-2
          placeholder:text-white/30 focus:border-white outline-none"
      />
    </div>
  )
}
