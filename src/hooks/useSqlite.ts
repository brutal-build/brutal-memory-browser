import { useState, useCallback } from 'react'
import initSqlJs from 'sql.js'
import { useStore } from '../store/useStore'

let wasmLoadingPromise: Promise<void> | null = null
let SQL: any = null

export function useSqlite() {
  const [wasmLoading, setWasmLoading] = useState(false)
  const [wasmError, setWasmError] = useState<string | null>(null)
  const setDb = useStore((s) => s.setDb)
  const setSessions = useStore((s) => s.setSessions)
  const setLoading = useStore((s) => s.setLoading)
  const setError = useStore((s) => s.setError)

  const loadWasm = useCallback(async () => {
    if (wasmLoadingPromise) return wasmLoadingPromise
    setWasmLoading(true)
    setWasmError(null)
    wasmLoadingPromise = (async () => {
      try {
        const init = await initSqlJs({
          locateFile: (file: string) => `/${file}`,
        })
        SQL = init
      } catch (err: any) {
        wasmLoadingPromise = null
        throw err
      }
    })()
    try {
      await wasmLoadingPromise
    } catch (err: any) {
      setWasmError(err.message || 'Failed to load SQL.js WASM')
    } finally {
      setWasmLoading(false)
    }
  }, [])

  const openDb = useCallback(async (file: File) => {
    if (!SQL) {
      setError('SQL.js not loaded yet')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const buffer = await file.arrayBuffer()
      const uint8 = new Uint8Array(buffer)
      const db: any = new SQL.Database(uint8)

      // Validate: check if sessions table exists
      const result = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='sessions'")
      if (result.length === 0) {
        setError('Invalid database: no sessions table found')
        setLoading(false)
        return
      }

      // Load sessions
      const rows = db.exec(`
        SELECT id, title, source, model, started_at, ended_at,
               message_count, tool_call_count, input_tokens, output_tokens, archived
        FROM sessions
        ORDER BY started_at DESC
      `)

      const sessions = rows[0]?.values.map((row: any[]) => ({
        id: row[0] as string,
        title: row[1] as string | null,
        source: row[2] as string,
        model: row[3] as string,
        started_at: row[4] as number,
        ended_at: row[5] as number | null,
        message_count: row[6] as number,
        tool_call_count: row[7] as number,
        input_tokens: row[8] as number,
        output_tokens: row[9] as number,
        archived: row[10] as number,
      })) || []

      // Set both atomically so no component renders with db but no sessions
      setSessions(sessions)
      setDb(db)
    } catch (err: any) {
      setError(err.message || 'Failed to open database')
    } finally {
      setLoading(false)
    }
  }, [SQL, setDb, setSessions, setLoading, setError])

  return { loadWasm, openDb, wasmLoading, wasmError }
}
