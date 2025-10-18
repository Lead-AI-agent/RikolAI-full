# StyleAI Dashboard - Personalized Fashion Retail AI Platform

## 🎯 Project Vision

StyleAI is an intelligent customer engagement platform designed for fashion retailers to reach old customers with personalized product recommendations using AI technology. The system creates detailed customer profiles and uses AI support to proactively suggest new products, create virtual try-on experiences, and help sales teams identify customers ready to make a purchase.

## ✨ Key Features

### 1. **Personalized Customer Profiles**
- Automatic profile creation based on purchase history
- Style preference tracking (colors, styles, occasions)
- Size and fit preferences
- Price range preferences
- Brand affinities
- Engagement scoring

### 2. **AI-Powered Recommendations**
- Analyze customer purchase patterns
- Suggest products matching customer style
- Multi-channel outreach (WhatsApp, Instagram, Telegram, Email)
- Personalized messaging based on customer preferences
- Smart timing for recommendations

### 3. **Virtual Try-On Simulation**
- AI-generated product previews
- Visualize how items look on customer body type
- Show styling combinations
- Generate outfit suggestions
- Create shareable looks

### 4. **Customer Engagement Automation**
- Automated outreach campaigns
- Real-time customer interaction tracking
- Engagement scoring and readiness detection
- Multi-touch attribution
- Sales team notifications

### 5. **Dashboard Analytics**
- Total customers and segments
- Active vs dormant customer tracking
- VIP customer management
- Revenue metrics
- Engagement score visualization

## 📊 Customer Segments

### Status Types
- **New**: Recently added customers
- **Active**: Regular shoppers
- **Engaged**: High interaction customers  
- **VIP**: Premium, high-value customers
- **Dormant**: Inactive but potential customers

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── HomePage.tsx           # Main dashboard
│   ├── SimulationPage.tsx     # AI recommendation simulation
│   └── LeadDetailPage.tsx     # Customer detail view
├── components/
│   ├── dashboard-header.tsx   # Top navigation
│   ├── stats-cards.tsx        # KPI cards
│   ├── leads-table.tsx        # Customer list table
│   └── ui/                    # Radix UI components
├── lib/
│   └── mock-data.ts          # Customer data & interfaces
└── hooks/
    ├── use-mobile.ts         # Mobile detection
    └── use-toast.ts          # Toast notifications
```

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React

## 🚀 Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm run dev
```

### Build
```bash
pnpm run build
```

## 🚀 Future Enhancements

- [ ] Real AI integration for recommendations
- [ ] Image generation for virtual try-ons
- [ ] Advanced analytics and reporting
- [ ] A/B testing for messaging
- [ ] Inventory integration
- [ ] Payment processing

---

**Built with ❤️ for fashion retail innovation**
