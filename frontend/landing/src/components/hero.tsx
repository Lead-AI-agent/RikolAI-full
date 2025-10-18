import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">AI-Powered Customer Retention</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Turn One-Time Buyers Into Loyal Customers
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed text-balance">
              Our AI creates personalized customer profiles, tracks preferences, and automatically reaches out with
              perfect product recommendations. Turn past customers into repeat buyers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-12 px-8 gap-2 hover:scale-105 transition-transform"
                onClick={() => window.open('https://app.leadcall.uz', '_blank')}
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-secondary text-lg h-12 px-8 bg-transparent hover:scale-105 transition-transform"
                onClick={() => window.open('https://app.leadcall.uz', '_blank')}
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm text-muted-foreground">
              <div>
                <div className="font-bold text-foreground">85%</div>
                <div>Repeat Purchase Rate</div>
              </div>
              <div>
                <div className="font-bold text-foreground">3.2x</div>
                <div>Customer Lifetime Value</div>
              </div>
              <div>
                <div className="font-bold text-foreground">24/7</div>
                <div>AI Personalization</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl animate-pulse" />
            <div className="relative bg-card border border-border rounded-2xl p-6 max-w-sm mx-auto hover:scale-105 transition-transform duration-300">
              {/* Phone Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">AI</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Rikol.AI</div>
                    <div className="text-xs text-muted-foreground">Online now</div>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3">
                {/* AI Message */}
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs">AI</span>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-foreground">Hi Sarah! 👋 I found some new arrivals that match your style perfectly!</p>
                  </div>
                </div>

                {/* Customer Message */}
                <div className="flex gap-2 justify-end">
                  <div className="bg-primary rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-primary-foreground">Really? Show me! 😍</p>
                  </div>
                  <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-sm font-semibold">S</span>
                  </div>
                </div>

                {/* AI Message with Product */}
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs">AI</span>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                    <div className="space-y-2">
                      <p className="text-sm text-foreground">Check out this gorgeous summer dress! 🌸</p>
                      <div className="bg-card border border-border rounded-lg p-2">
                        <div className="flex gap-2">
                          <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                            <img
                              src="/user1.png"
                              alt="Sarah wearing current outfit"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="w-full h-8 bg-gradient-to-br from-pink-200 to-purple-200 rounded mb-1"></div>
                            <div className="text-xs font-semibold text-foreground">Floral Summer Dress</div>
                            <div className="text-xs text-muted-foreground">$89 • Your size: M</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs">AI</span>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
