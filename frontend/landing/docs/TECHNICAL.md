# Technical Documentation - Rikol.AI Landing Page

## 🏗️ Architecture Overview

The Rikol.AI landing page is built as a Single Page Application (SPA) using React 18 with TypeScript, providing a modern, performant, and maintainable codebase.

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0"
}
```

### Build Tools
```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.0.0"
}
```

### Styling
```json
{
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

### Icons & UI
```json
{
  "lucide-react": "^0.294.0",
  "clsx": "^2.0.0"
}
```

## 🎯 Component Architecture

### Component Hierarchy
```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   └── CTA Buttons
├── Hero
│   ├── Value Proposition
│   ├── Chat Mockup
│   └── Metrics
├── Features
│   └── Feature Cards (6x)
├── HowItWorks
│   └── Process Steps (5x)
├── Results
│   └── Metric Cards (4x)
├── Testimonials
│   └── Testimonial Cards (6x)
├── FAQ
│   └── FAQ Items (8x)
├── CTA
│   └── Action Buttons
└── Footer
```

### Component Props & State

#### Header Component
```typescript
interface HeaderProps {
  // No props - self-contained
}

// State
const [isOpen, setIsOpen] = useState<boolean>(false)
```

#### Hero Component
```typescript
interface HeroProps {
  // No props - static content
}

// Features
- Chat mockup with animated typing
- Responsive metrics display
- CTA buttons with external links
```

#### Features Component
```typescript
interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

// Features array with 6 items
const features: Feature[] = [...]
```

## 🎨 Styling Architecture

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))"
      }
    }
  }
}
```

### CSS Variables
```css
:root {
  --primary: 210 100% 50%;
  --secondary: 210 40% 98%;
  --accent: 210 100% 60%;
  --background: 0 0% 100%;
  --foreground: 222 84% 5%;
  --muted: 210 40% 96%;
  --border: 214 32% 91%;
}
```

### Responsive Design
- **Mobile First**: Base styles for mobile devices
- **Breakpoints**: 
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## 🔧 Build Configuration

### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
})
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 🚀 Performance Optimizations

### Code Splitting
- **Route-based splitting**: Each section as separate chunk
- **Vendor splitting**: Separate chunks for React and icons
- **Lazy loading**: Components loaded on demand

### Bundle Analysis
```bash
# Analyze bundle size
pnpm build
npx vite-bundle-analyzer dist
```

### Image Optimization
- **WebP format**: Modern image format support
- **Lazy loading**: Images load when needed
- **Responsive images**: Different sizes for different devices

### CSS Optimization
- **Purge CSS**: Remove unused styles
- **Critical CSS**: Inline critical styles
- **Minification**: Compressed CSS output

## 🔒 Security Considerations

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

### External Links
- **Target blank**: All external links open in new tab
- **Rel noopener**: Security for external links
- **HTTPS only**: Secure connections required

### Data Handling
- **No sensitive data**: No API keys in client code
- **Environment variables**: Use .env for configuration
- **Input validation**: Sanitize user inputs

## 🧪 Testing Strategy

### Unit Testing
```typescript
// Example test structure
describe('Hero Component', () => {
  it('renders value proposition', () => {
    render(<Hero />)
    expect(screen.getByText(/Turn One-Time Buyers/)).toBeInTheDocument()
  })
  
  it('handles button clicks', () => {
    const mockOpen = jest.fn()
    window.open = mockOpen
    
    render(<Hero />)
    fireEvent.click(screen.getByText('Get Started Free'))
    
    expect(mockOpen).toHaveBeenCalledWith('https://app.leadcall.uz', '_blank')
  })
})
```

### Integration Testing
- **Component interaction**: Test component communication
- **User flows**: Test complete user journeys
- **Responsive behavior**: Test across device sizes

### E2E Testing
```typescript
// Playwright example
test('landing page loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Turn One-Time Buyers')
  await expect(page.locator('[data-testid="chat-mockup"]')).toBeVisible()
})
```

## 📊 Analytics & Monitoring

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bundle size**: Monitor bundle size changes
- **Load times**: Track page load performance

### User Analytics
- **Button clicks**: Track CTA button interactions
- **Scroll depth**: Monitor user engagement
- **Form submissions**: Track lead generation

### Error Monitoring
- **JavaScript errors**: Track runtime errors
- **Network failures**: Monitor API failures
- **User feedback**: Collect user experience data

## 🔄 State Management

### Local State
```typescript
// Component-level state
const [isOpen, setIsOpen] = useState(false)
const [activeFAQ, setActiveFAQ] = useState<number | null>(null)
```

### Global State
- **No global state needed**: Static landing page
- **URL state**: Browser history for navigation
- **Local storage**: User preferences (if needed)

## 🎯 SEO Optimization

### Meta Tags
```html
<meta name="description" content="Rikol.AI - AI-powered customer retention platform for retail businesses">
<meta name="keywords" content="AI, customer retention, retail, personalization">
<meta property="og:title" content="Rikol.AI - Turn One-Time Buyers Into Loyal Customers">
<meta property="og:description" content="AI-powered customer retention platform">
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Rikol.AI",
  "description": "AI-powered customer retention platform",
  "url": "https://app.leadcall.uz"
}
```

### Sitemap
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rikol.ai/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🚀 Deployment Pipeline

### Development
```bash
# Start development server
pnpm dev

# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

### Staging
```bash
# Build for staging
pnpm build:staging

# Deploy to staging
pnpm deploy:staging
```

### Production
```bash
# Build for production
pnpm build

# Deploy to production
pnpm deploy:production
```

## 🔧 Maintenance

### Regular Updates
- **Dependencies**: Update packages monthly
- **Security patches**: Apply security updates immediately
- **Performance**: Monitor and optimize regularly

### Monitoring
- **Uptime**: 99.9% uptime target
- **Performance**: Core Web Vitals monitoring
- **Errors**: Error tracking and alerting

---

**Technical Documentation v1.0.0**

