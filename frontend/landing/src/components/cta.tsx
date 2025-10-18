import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Ready to Transform Your Customer Retention?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Join retail businesses using Rikol.AI to turn one-time buyers into loyal, repeat customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-12 px-8 gap-2"
              onClick={() => window.open('https://app.leadcall.uz', '_blank')}
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-secondary text-lg h-12 px-8 bg-transparent"
              onClick={() => window.open('https://app.leadcall.uz', '_blank')}
            >
              See Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">No credit card required. Get started in minutes.</p>
        </div>
      </div>
    </section>
  )
}
