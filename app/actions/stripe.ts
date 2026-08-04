"use server"

import { stripe } from "@/lib/stripe"
import { getDeposit } from "@/lib/deposits"

export async function startDepositCheckout(depositId: string) {
  const deposit = getDeposit(depositId)
  if (!deposit) {
    throw new Error(`Deposit option "${depositId}" not found`)
  }

  const session = await stripe.checkout.sessions.create(
    {
      ui_mode: "embedded",
      redirect_on_completion: "never",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: deposit.name,
              description: deposit.description,
            },
            // price comes from the server-side catalog, never the client
            unit_amount: deposit.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    },
    // idempotency guards against double-charging on retry
    { idempotencyKey: `deposit_${depositId}_${Date.now()}` },
  )

  return session.client_secret
}
