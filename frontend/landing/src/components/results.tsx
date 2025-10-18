import { TrendingUp } from "lucide-react"

const results = [
  {
    metric: "85%",
    label: "Repeat Purchase Rate",
    description: "Customers return to buy again and again",
  },
  {
    metric: "3.2x",
    label: "Customer Lifetime Value",
    description: "AI personalization increases spending per customer",
  },
  {
    metric: "40%",
    label: "Reduced Churn",
    description: "Keep customers engaged and coming back",
  },
  {
    metric: "2.5x",
    label: "Average Order Value",
    description: "Personalized recommendations increase basket size",
  },
]

export function Results() {
  return (
    <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Proven Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Real Results From Retail Partners
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            See how Rikol.AI is transforming retail businesses and customer retention
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/50 hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-primary mb-2">{result.metric}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{result.label}</h3>
              <p className="text-muted-foreground">{result.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
