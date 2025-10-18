import { User, Brain, ShoppingBag, Camera, MessageSquare, BarChart3 } from "lucide-react"

const features = [
  {
    icon: User,
    title: "Personalized Customer Profiles",
    description: "AI creates detailed profiles tracking purchase history, preferences, style, and behavior patterns for each customer.",
  },
  {
    icon: Brain,
    title: "Smart Product Recommendations",
    description: "AI analyzes customer data to suggest perfect products they'll love, increasing repeat purchase likelihood.",
  },
  {
    icon: Camera,
    title: "Virtual Try-On Technology",
    description: "Customers can see how new clothes look on them using AI-powered virtual fitting and styling.",
  },
  {
    icon: MessageSquare,
    title: "Automated Personalized Outreach",
    description: "AI sends personalized messages with product suggestions, styling tips, and exclusive offers at the perfect time.",
  },
  {
    icon: BarChart3,
    title: "Purchase Intent Prediction",
    description: "AI predicts when customers are ready to buy and alerts your sales team with actionable insights.",
  },
  {
    icon: ShoppingBag,
    title: "Seamless Re-engagement",
    description: "Turn past customers into repeat buyers with personalized campaigns that feel natural and helpful.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            AI-Powered Customer Retention Platform
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            Everything you need to turn one-time buyers into loyal, repeat customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
