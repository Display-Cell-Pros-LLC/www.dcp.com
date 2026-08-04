"use client"

import { useState } from "react"
import { Search, Loader2, AlertCircle } from "lucide-react"

interface StatusResult {
  title: string
  state: string
  created_at: string
  updated_at: string
  labels: string[]
}

export function StatusLookup() {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<StatusResult | null>(null)

  async function lookup(e: React.FormEvent) {
    e.preventDefault()
    const num = value.replace(/[^0-9]/g, "")
    if (!num) {
      setError("Enter your ticket number.")
      return
    }
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await fetch(`/api/repair-status/${num}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Unable to find that ticket.")
      setResult(json)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to find that ticket.")
    } finally {
      setLoading(false)
    }
  }

  const isOpen = result?.state === "open"

  return (
    <section id="status" className="relative border-t border-border bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Repair Status</p>
        <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Track your repair ticket
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Enter the ticket number from your intake confirmation to see the latest status.
        </p>

        <form onSubmit={lookup} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              inputMode="numeric"
              placeholder="Ticket number, e.g. 42"
              aria-label="Ticket number"
              className="w-full rounded-md border border-input bg-background py-3 pl-9 pr-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Look up
          </button>
        </form>

        {error && (
          <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground">
            <AlertCircle className="h-4 w-4 text-destructive" />
            {error}
          </p>
        )}

        {result && (
          <div className="mx-auto mt-6 max-w-md rounded-lg border border-border bg-background p-6 text-left">
            <div className="flex items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isOpen ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-accent" : "bg-primary"}`} />
                {isOpen ? "In Progress" : "Completed"}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Updated {new Date(result.updated_at).toLocaleDateString()}
              </span>
            </div>
            <h3 className="mt-3 font-semibold text-foreground">{result.title}</h3>
            {result.labels.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {result.labels.map((l) => (
                  <span key={l} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {l}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Opened {new Date(result.created_at).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
