// Source of truth for repair deposit options.
// Prices are validated server-side; the client only sends an id.
export interface Deposit {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const DEPOSITS: Deposit[] = [
  {
    id: "diagnostic",
    name: "Diagnostic Deposit",
    description: "Full board-level diagnostic. Credited toward your repair.",
    priceInCents: 4900,
  },
  {
    id: "microsolder",
    name: "Micro-Soldering Deposit",
    description: "Tier 3 component-level micro-soldering intake deposit.",
    priceInCents: 9900,
  },
  {
    id: "data-recovery",
    name: "Data Recovery Deposit",
    description: "Secure data recovery evaluation and handling deposit.",
    priceInCents: 14900,
  },
  {
    id: "federal",
    name: "Federal Procurement Retainer",
    description: "Retainer for federal / enterprise procurement engagements.",
    priceInCents: 25000,
  },
]

export function getDeposit(id: string) {
  return DEPOSITS.find((d) => d.id === id)
}

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100)
}
