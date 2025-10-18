import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How does Rikol.AI create personalized customer profiles?",
    answer: "Our AI analyzes customer purchase history, browsing behavior, style preferences, size information, and interaction patterns to build comprehensive profiles. It tracks what customers buy, when they buy, and what they're likely to want next."
  },
  {
    question: "Can Rikol.AI integrate with my existing e-commerce platform?",
    answer: "Yes! Rikol.AI integrates seamlessly with popular platforms like Shopify, WooCommerce, Magento, and custom solutions. We also offer API access for custom integrations."
  },
  {
    question: "How accurate is the virtual try-on technology?",
    answer: "Our virtual try-on uses advanced computer vision and AI to provide 95%+ accuracy in size and fit predictions. Customers can see how clothes look on their body type before purchasing."
  },
  {
    question: "What types of retail businesses can use Rikol.AI?",
    answer: "Rikol.AI works for all retail businesses including fashion, accessories, shoes, beauty, home goods, and more. Any business that wants to increase customer retention and personalization can benefit."
  },
  {
    question: "How does the AI know when customers are ready to buy?",
    answer: "Our AI analyzes multiple signals including browsing behavior, time since last purchase, seasonal patterns, price sensitivity, and engagement with previous recommendations to predict purchase intent."
  },
  {
    question: "Is my customer data secure with Rikol.AI?",
    answer: "Absolutely. We use enterprise-grade security with end-to-end encryption, GDPR compliance, and SOC 2 certification. Your customer data is never shared with third parties."
  },
  {
    question: "How quickly can I see results?",
    answer: "Most businesses see improved customer engagement within 2-4 weeks, and significant increases in repeat purchase rates within 2-3 months of implementation."
  },
  {
    question: "Do I need technical expertise to use Rikol.AI?",
    answer: "No technical expertise required! Our platform is designed for business owners and marketing teams. We provide setup assistance and ongoing support to ensure success."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Frequently Asked</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            Everything you need to know about Rikol.AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/50 transition"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              onClick={() => window.open('https://app.leadcall.uz', '_blank')}
            >
              Contact Support
            </button>
            <button 
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition"
              onClick={() => window.open('https://app.leadcall.uz', '_blank')}
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
