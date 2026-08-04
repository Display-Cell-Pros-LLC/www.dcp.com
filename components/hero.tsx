"use client"

import dynamic from "next/dynamic"
import { ShieldCheck, Award, Landmark } from "lucide-react"

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden="true" />,
})

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="circuit-grid absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:pb-24 lg:pt-36">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Combat Veteran &amp; Tribal Member-Owned
          </div>

          <h1 className="text-balance font-mono text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Tier 3 micro-soldering. <span className="text-primary">Mission-grade</span> device repair.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Display &amp; Cell Pros LLC is a precision board-level repair lab and federal procurement contractor.
            We restore what others replace — with data-secure handling and veteran discipline on every bench.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#intake"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start a Repair Intake
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Explore Capabilities
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { icon: Award, label: "Certification", value: "Tier 3" },
              { icon: ShieldCheck, label: "Data Handling", value: "Secure" },
              { icon: Landmark, label: "Contracting", value: "Federal" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <s.icon className="h-5 w-5 text-accent" />
                <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                <dd className="font-mono text-lg font-bold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[520px]">
          <HeroScene />
        </div>
      </div>
    </section>
  )
}
