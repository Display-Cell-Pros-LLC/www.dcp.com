import Image from "next/image"
import { Medal, Users, Flag } from "lucide-react"

export function About() {
  return (
    <section id="about" className="relative border-t border-border bg-card py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-border">
            <Image
              src="/team/founder.jpg"
              alt="Founder of Display & Cell Pros LLC"
              width={640}
              height={640}
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden rounded-md border border-border bg-background px-4 py-3 sm:block">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Veteran-Owned</p>
            <p className="text-sm font-semibold text-foreground">Discipline on every bench</p>
          </div>
        </div>

        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Who we are</p>
          <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built on service. Run with precision.
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Display &amp; Cell Pros LLC is a Combat Veteran &amp; Tribal Member-Owned repair lab. The same
              attention to detail that mattered downrange defines how we work at the bench — nothing leaves the
              lab unless it&apos;s done right.
            </p>
            <p>
              We combine Tier 3 micro-soldering expertise with strict data-security protocols, serving individuals,
              enterprises, and federal agencies who need repairs they can trust and account for.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Medal, label: "Veteran-led leadership" },
              { icon: Flag, label: "Tribal member-owned" },
              { icon: Users, label: "Enterprise & federal ready" },
            ].map((v) => (
              <div key={v.label} className="rounded-md border border-border bg-background p-4">
                <v.icon className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-medium text-foreground">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
