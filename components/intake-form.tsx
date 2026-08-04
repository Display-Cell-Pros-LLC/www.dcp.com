"use client"

import { useState } from "react"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

const services = [
  "Tier 3 Micro-Soldering",
  "Data-Secure Repair",
  "Board-Level Diagnostics",
  "Mobile Device Recovery",
  "Data Recovery",
  "Federal Procurement",
]

type Status = "idle" | "loading" | "success" | "error"

export function IntakeForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [feedback, setFeedback] = useState<string>("")
  const [ticket, setTicket] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setFeedback("")
    setTicket(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      serviceInterest: data.get("serviceInterest"),
      message: data.get("message"),
      dataSecureGuarantee: data.get("dataSecureGuarantee") === "on",
    }

    try {
      const res = await fetch("/api/repair-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Something went wrong.")

      setStatus("success")
      setTicket(json.ticketNumber ?? null)
      setFeedback(
        json.ticketNumber
          ? `Received. Your ticket number is #${json.ticketNumber} — save it to check status.`
          : "Received. Our team will reach out shortly to coordinate your repair.",
      )
      form.reset()
    } catch (err: unknown) {
      setStatus("error")
      setFeedback(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  return (
    <section id="intake" className="relative border-t border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Repair Intake</p>
          <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start your repair request
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Tell us about the device and the fault. We&apos;ll open a tracked repair ticket and follow up with a
            diagnostic plan. Every submission is handled under our data-secure protocols.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Organization (optional)" name="company" />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="serviceInterest" className="text-sm font-medium text-foreground">
                Service interest
              </label>
              <select
                id="serviceInterest"
                name="serviceInterest"
                defaultValue={services[0]}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Device &amp; symptoms
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="e.g. iPhone 13 Pro, no power after liquid exposure, previously repaired elsewhere..."
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <label className="mt-4 flex items-start gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="dataSecureGuarantee"
              className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
            />
            <span>Request a documented data-secure guarantee (chain-of-custody &amp; wipe certificate).</span>
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "loading" ? "Submitting..." : "Submit Repair Request"}
          </button>

          {status === "success" && (
            <p className="mt-4 flex items-start gap-2 rounded-md border border-accent/40 bg-accent/10 p-3 text-sm text-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{feedback}</span>
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <span>{feedback}</span>
            </p>
          )}
          {ticket !== null && (
            <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
              Track anytime in the Status section.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  )
}
