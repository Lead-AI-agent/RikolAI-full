import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsOpen(false) // Close mobile menu after clicking
  }

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-foreground">Rikol AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-foreground transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-muted-foreground hover:text-foreground transition"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="text-muted-foreground hover:text-foreground transition"
            >
              Results
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-foreground"
              onClick={() => window.open('https://app.leadcall.uz', '_blank')}
            >
              Sign In
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.open('https://app.leadcall.uz', '_blank')}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground"
            >
              Results
            </button>
            <div className="flex gap-2 px-4 pt-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => window.open('https://app.leadcall.uz', '_blank')}
              >
                Sign In
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => window.open('https://app.leadcall.uz', '_blank')}
              >
                Start Free Trial
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
