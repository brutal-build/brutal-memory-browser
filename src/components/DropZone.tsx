import { useEffect, useRef } from 'react'
import { BracketButton } from './shared/BracketButton'

interface Props {
  onFile: (file: File) => void
  loading?: boolean
  error?: string | null
  wasmLoading?: boolean
  wasmError?: string | null
}

export function DropZone({ onFile, loading, error, wasmLoading, wasmError }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dropRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = dropRef.current
    if (!el) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const file = e.dataTransfer?.files?.[0]
      if (file) onFile(file)
    }

    el.addEventListener('dragover', handleDragOver)
    el.addEventListener('drop', handleDrop)
    return () => {
      el.removeEventListener('dragover', handleDragOver)
      el.removeEventListener('drop', handleDrop)
    }
  }, [onFile])

  const handleSelect = () => inputRef.current?.click()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) onFile(file)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white font-mono">
        <div className="text-2xl mb-4">Loading database...</div>
        <div className="text-sm text-white/60">Parsing database file...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white font-mono p-8">
      <div
        ref={dropRef}
        className="border-2 border-dashed border-white/30 p-16 text-center cursor-pointer
          hover:border-white hover:bg-white/5 transition-colors duration-200"
        onClick={handleSelect}
      >
        <div className="text-3xl mb-6 text-white/80">Drop <span className="text-white font-bold">state.db</span> here</div>
        <BracketButton onClick={(e) => { e.stopPropagation(); handleSelect() }}>
          SELECT FILE
        </BracketButton>
        <input
          ref={inputRef}
          type="file"
          accept=".db,.sqlite,.sqlite3"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {wasmLoading && (
        <div className="mt-6 text-white/60 text-sm">Loading SQL.js WASM (≈1.2MB)...</div>
      )}
      {wasmError && (
        <div className="mt-6 text-red-500 text-sm">{wasmError}</div>
      )}
      {error && (
        <div className="mt-6 text-red-500 text-sm">{error}</div>
      )}

      <div className="mt-8 text-white/40 text-xs text-center max-w-md">
        Your database stays in your browser. Nothing is uploaded.
      </div>
    </div>
  )
}
