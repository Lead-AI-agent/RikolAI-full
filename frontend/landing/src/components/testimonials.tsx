import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Owner, Style Boutique",
    avatar: "SC",
    content: "Rikol.AI has transformed our business. Our repeat purchase rate went from 25% to 85% in just 3 months. The AI knows our customers better than we do!",
    rating: 5,
    metric: "85% repeat rate"
  },
  {
    name: "Marcus Rodriguez",
    role: "CEO, Urban Fashion Co.",
    avatar: "MR",
    content: "Rikol.AI's personalized recommendations are incredible. Customers feel like we truly understand their style. Our average order value increased by 2.5x.",
    rating: 5,
    metric: "2.5x AOV increase"
  },
  {
    name: "Emma Thompson",
    role: "Marketing Director, Trendy Threads",
    avatar: "ET",
    content: "Rikol.AI's virtual try-on feature is a game-changer. Customers can see how clothes look on them before buying. Our return rate dropped by 60%.",
    rating: 5,
    metric: "60% fewer returns"
  },
  {
    name: "David Kim",
    role: "Founder, Modern Menswear",
    avatar: "DK",
    content: "Rikol.AI's purchase intent prediction is spot-on. We know exactly when to reach out to customers. Our conversion rate improved by 40%.",
    rating: 5,
    metric: "40% better conversion"
  },
  {
    name: "Lisa Johnson",
    role: "Owner, Elegant Essentials",
    avatar: "LJ",
    content: "Rikol.AI creates such personalized experiences. Our customers love the styling tips and product suggestions. Customer satisfaction is at an all-time high.",
    rating: 5,
    metric: "98% satisfaction"
  },
  {
    name: "Alex Patel",
    role: "CEO, Fashion Forward",
    avatar: "AP",
    content: "We've seen a 3.2x increase in customer lifetime value. Rikol.AI keeps customers engaged and coming back for more. It's like having a personal stylist for every customer.",
    rating: 5,
    metric: "3.2x CLV increase"
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Customer Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Loved by Retail Businesses Worldwide
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            See how CustomerAI is transforming retail businesses and customer relationships
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition group relative"
            >
              <div className="absolute top-4 right-4">
                <Quote className="w-6 h-6 text-primary/20" />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                "{testimonial.content}"
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">{testimonial.metric}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Join <span className="font-semibold text-foreground">500+</span> retail businesses already using Rikol.AI
          </p>
        </div>
      </div>
    </section>
  )
}
