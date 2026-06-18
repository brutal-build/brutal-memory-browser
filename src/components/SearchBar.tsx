import { useStore } from '../store/useStore'
import { useEffect, useRef, useState } from 'react'

export function SearchBar() {
  const searchQuery = useStore((s) => s.searchQuery)
  const setSearchQuery = useStore((s) => s.setSearchQuery)
  const [local, setLocal] = useState(searchQuery)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setSearchQuery(local)
    }, 300)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [local, setSearchQuery])

  return (
    <div className="px-6 py-3">
      <input
        type="text"
        placeholder="[ SEARCH... ]"
        value={local}
        onChange={(e) => setLocal((e.target as HTMLInputElement).value)}
        className="w-full bg-black border-2 border-white/20 text-white font-mono text-sm px-4 py-2
          placeholder:text-white/30 focus:border-white outline-none"
      />
    </div>
  )
}
