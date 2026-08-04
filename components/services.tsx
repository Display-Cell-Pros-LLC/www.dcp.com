import { Cpu, ShieldCheck, Landmark, Microscope, Smartphone, FileCheck2 } from "lucide-react"

const services = [
  {
    icon: Cpu,
    title: "Tier 3 Micro-Soldering",
    body: "Component-level board repair down to the smallest BGA, PMIC, and audio IC. We reball, reflow, and jumper broken traces to bring dead boards back to life.",
  },
  {
    icon: ShieldCheck,
    title: "Data-Secure Repair",
    body: "Every device is handled under documented chain-of-custody. Data stays encrypted, isolated, and never leaves the lab — verifiable wipe certificates on request.",
  },
  {
    icon: Landmark,
    title: "Federal Procurement",
    body: "Registered contractor supporting government and enterprise device lifecycles: sourcing, secure refurbishment, and compliant asset disposition.",
  },
  {
    icon: Microscope,
    title: "Board-Level Diagnostics",
    body: "Microscope-driven fault isolation with schematic and boardview analysis. You get a clear diagnosis before a single joint is touched.",
  },
  {
    icon: Smartphone,
    title: "Mobile Device Recovery",
    body: "Phones, tablets, and wearables — from shattered displays to no-power logic boards and water-damage restoration.",
  },
  {
    icon: FileCheck2,
    title: "Data Recovery",
    body: "Physical and logical recovery from damaged storage, including NAND-level work for devices deemed unrecoverable elsewhere.",
  },
]

export function Services() {
  return (
    <section id="services" className="relative border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Capabilities</p>
          <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Precision work at the component level
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            We specialize in the repairs most shops turn away. If it has a circuit board, there&apos;s a strong
            chance we can save it.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
