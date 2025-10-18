import { Features } from "./components/features";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how-it-works";
import { Results } from "./components/results";
import { Testimonials } from "./components/testimonials";
import { FAQ } from "./components/faq";


export default function App() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Results />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
