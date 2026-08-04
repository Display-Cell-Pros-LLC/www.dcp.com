"use client"

import { useCallback, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Check } from "lucide-react"
import { DEPOSITS, formatUsd } from "@/lib/deposits"
import { startDepositCheckout } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export function DepositCheckout() {
  const [selected, setSelected] = useState<string | null>(null)

  const fetchClientSecret = useCallback(() => {
    if (!selected) return Promise.resolve(null as unknown as string)
    return startDepositCheckout(selected) as Promise<string>
  }, [selected])

  return (
    <section id="deposit" className="relative border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">Deposits</p>
          <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Secure your bench time
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Deposits reserve diagnostic and repair time and are credited toward your final invoice. Payments are
            processed securely by Stripe.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {DEPOSITS.map((d) => {
              const active = selected === d.id
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelected(d.id)}
                  className={`flex flex-col rounded-lg border p-5 text-left transition-colors ${
                    active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{d.name}</span>
                    {active && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                  <span className="mt-2 font-mono text-2xl font-bold text-primary">{formatUsd(d.priceInCents)}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</span>
                </button>
              )
            })}
          </div>

          <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
            {selected ? (
              <EmbeddedCheckoutProvider
                key={selected}
                stripe={stripePromise}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            ) : (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-2 text-center">
                <p className="font-mono text-sm font-semibold text-foreground">Select a deposit to continue</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Choose an option on the left and secure checkout will load here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
