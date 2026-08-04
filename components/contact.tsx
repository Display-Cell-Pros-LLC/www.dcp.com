import { Mail, Phone, Clock, ShieldCheck } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-border bg-card py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Contact</p>
          <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Talk to the lab
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Have a device others gave up on, or a procurement requirement to discuss? Reach out and we&apos;ll
            respond with a clear, no-pressure assessment.
          </p>

          <div className="mt-8 space-y-4">
            <ContactRow icon={Mail} label="Email" value="repairs@displaycellpros.com" />
            <ContactRow icon={Phone} label="Phone" value="(555) 010-3372" />
            <ContactRow icon={Clock} label="Hours" value="Mon–Fri, 9:00 AM – 6:00 PM" />
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-lg border border-border bg-background p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h3 className="mt-5 font-mono text-xl font-bold text-foreground">Data-secure by default</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Every engagement follows documented chain-of-custody. Your data stays encrypted and isolated, and we
            provide verifiable wipe certificates for enterprise and federal work on request.
          </p>
          <a
            href="#intake"
            className="mt-6 inline-flex w-fit items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a Repair Intake
          </a>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
