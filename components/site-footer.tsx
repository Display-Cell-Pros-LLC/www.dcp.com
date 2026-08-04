import { CircuitBoard } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CircuitBoard className="h-5 w-5" />
          </span>
          <div>
            <p className="font-mono text-sm font-bold text-foreground">Display &amp; Cell Pros LLC</p>
            <p className="text-xs text-muted-foreground">Combat Veteran &amp; Tribal Member-Owned</p>
          </div>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          Tier 3 precision micro-soldering, mobile data-secure repair, and federal procurement contracting.
          All repairs handled under strict chain-of-custody protocols.
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Display &amp; Cell Pros LLC. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
