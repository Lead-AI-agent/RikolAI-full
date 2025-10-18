import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Customer Makes Purchase",
    description: "When a customer buys from your store, our AI automatically starts building their personalized profile.",
  },
  {
    number: "02",
    title: "AI Creates Customer Profile",
    description: "AI analyzes purchase history, preferences, style, size, and behavior to create a detailed customer profile.",
  },
  {
    number: "03",
    title: "Smart Product Matching",
    description: "When new products arrive, AI matches them to customers who would love them based on their profile.",
  },
  {
    number: "04",
    title: "Personalized Outreach",
    description: "AI sends personalized messages with product suggestions, virtual try-ons, and styling tips.",
  },
  {
    number: "05",
    title: "Sales Team Alerts",
    description: "AI alerts your sales team when customers show high purchase intent, providing context and next steps.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">How Rikol.AI Works</h2>
          <p className="text-xl text-muted-foreground text-balance">
            A simple 5-step process to turn customers into repeat buyers
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary/20 border border-primary/30">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:flex flex-shrink-0 pt-20">
                  <ArrowRight className="w-6 h-6 text-primary/40 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
