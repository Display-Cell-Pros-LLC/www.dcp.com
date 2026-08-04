import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { IntakeForm } from "@/components/intake-form"
import { StatusLookup } from "@/components/status-lookup"
import { DepositCheckout } from "@/components/deposit-checkout"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Services />
        <About />
        <IntakeForm />
        <StatusLookup />
        <DepositCheckout />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
