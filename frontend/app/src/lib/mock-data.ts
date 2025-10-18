export interface Message {
  id: string
  role: "ai" | "user"
  text: string
  timestamp: string
  platform: "WhatsApp" | "Telegram" | "Instagram" | "Phone"
  productSuggestions?: string[]
}

export interface CallRecord {
  id: string
  type: "incoming" | "outgoing" | "missed"
  duration: string
  timestamp: string
  notes?: string
}

export interface PurchaseHistory {
  id: string
  productName: string
  category: string
  size: string
  color: string
  price: number
  purchaseDate: string
  rating?: number
}

export interface StyleProfile {
  preferredColors: string[]
  preferredStyles: string[]
  sizeProfile: string
  priceRange: { min: number; max: number }
  favoriteBrands: string[]
  occasions: string[]
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  source: "WhatsApp" | "Telegram" | "Instagram" | "Phone" | "Store" | "Website"
  status: "New" | "Active" | "Engaged" | "VIP" | "Dormant"
  lastContact: string
  messages: Message[]
  callRecords: CallRecord[]
  purchaseHistory: PurchaseHistory[]
  styleProfile: StyleProfile
  notes: string
  engagementScore: number
  nextRecommendationDate: string
  totalSpent: number
  averageOrderValue: number
}

// Unused constants removed for cleaner code

export function generateMockCustomers(): Customer[] {
  const customers: Customer[] = [
    {
      id: "CUST-0001",
      name: "Emma Rodriguez",
      email: "emma.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      source: "Instagram",
      status: "Active",
      lastContact: "2 hours ago",
      engagementScore: 92,
      nextRecommendationDate: "2024-01-25",
      totalSpent: 2450,
      averageOrderValue: 245,
      notes: "High-value customer who loves trendy pieces. Responds well to personalized recommendations. Recently purchased winter collection items.",
      purchaseHistory: [
        {
          id: "purchase-001",
          productName: "Winter Cashmere Sweater",
          category: "Sweaters",
          size: "M",
          color: "Navy Blue",
          price: 189,
          purchaseDate: "2024-01-15",
          rating: 5
        },
        {
          id: "purchase-002",
          productName: "High-Waisted Jeans",
          category: "Jeans",
          size: "M",
          color: "Dark Wash",
          price: 89,
          purchaseDate: "2024-01-10",
          rating: 4
        }
      ],
      styleProfile: {
        preferredColors: ["Navy Blue", "Black", "Cream", "Burgundy"],
        preferredStyles: ["Casual", "Business Casual", "Trendy"],
        sizeProfile: "Medium",
        priceRange: { min: 50, max: 300 },
        favoriteBrands: ["Our Brand", "Zara", "H&M"],
        occasions: ["Work", "Weekend", "Date Night"]
      },
      messages: [
        {
          id: "msg-001",
          role: "ai",
          text: "Hi Emma! 👋 I noticed you loved our Winter Cashmere Sweater! We just got some amazing new arrivals that I think you'd love - including a gorgeous burgundy blazer that would look perfect with your style!",
          timestamp: "2 hours ago",
          platform: "Instagram",
          productSuggestions: ["Burgundy Blazer", "Cashmere Cardigan"]
        },
        {
          id: "msg-002", 
          role: "user",
          text: "Oh wow! That sounds amazing! I do love burgundy. Can you show me what it looks like?",
          timestamp: "1 hour ago",
          platform: "Instagram"
        },
        {
          id: "msg-003",
          role: "ai", 
          text: "Absolutely! Here's a preview of the burgundy blazer - it's perfect for work or date nights! 💼✨ Would you like me to create a virtual try-on for you?",
          timestamp: "45 minutes ago",
          platform: "Instagram"
        },
        {
          id: "msg-004",
          role: "user",
          text: "Yes please! That would be so cool! 😍",
          timestamp: "30 minutes ago",
          platform: "Instagram"
        }
      ],
      callRecords: [
        {
          id: "call-001",
          type: "outgoing",
          duration: "8:45",
          timestamp: "1 day ago",
          notes: "Follow-up on winter collection - very interested in new arrivals"
        }
      ]
    },
    {
      id: "CUST-0002",
      name: "Jessica Park",
      email: "jessica.park@email.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      source: "Website",
      status: "Engaged",
      lastContact: "1 hour ago",
      engagementScore: 78,
      nextRecommendationDate: "2024-01-28",
      totalSpent: 1200,
      averageOrderValue: 150,
      notes: "Fashion-forward customer who loves sustainable brands. Very active on social media and shares purchases frequently.",
      purchaseHistory: [
        {
          id: "purchase-003",
          productName: "Eco-Friendly Cotton Dress",
          category: "Dresses",
          size: "S",
          color: "Forest Green",
          price: 129,
          purchaseDate: "2024-01-12",
          rating: 5
        },
        {
          id: "purchase-004",
          productName: "Sustainable Denim Jacket",
          category: "Jackets",
          size: "S",
          color: "Light Blue",
          price: 159,
          purchaseDate: "2024-01-05",
          rating: 4
        }
      ],
      styleProfile: {
        preferredColors: ["Green", "Earth Tones", "Pastels"],
        preferredStyles: ["Boho", "Sustainable", "Casual"],
        sizeProfile: "Small",
        priceRange: { min: 80, max: 250 },
        favoriteBrands: ["Our Brand", "Everlane", "Reformation"],
        occasions: ["Weekend", "Casual", "Travel"]
      },
      messages: [
        {
          id: "msg-005",
          role: "ai",
          text: "Hi Jessica! 🌿 I saw you loved our eco-friendly dress! We just launched a new sustainable collection with some beautiful earth-tone pieces. Would you like to see what we have?",
          timestamp: "1 hour ago",
          platform: "WhatsApp",
          productSuggestions: ["Earth Tone Sweater", "Sustainable Jeans"]
        },
        {
          id: "msg-006",
          role: "user",
          text: "Yes! I'm always looking for sustainable options. What's new?",
          timestamp: "45 minutes ago",
          platform: "WhatsApp"
        },
        {
          id: "msg-007",
          role: "ai",
          text: "Perfect! We have a gorgeous terracotta-colored sweater made from recycled materials and some amazing organic cotton pieces. I can show you how they'd look with your style!",
          timestamp: "30 minutes ago",
          platform: "WhatsApp"
        }
      ],
      callRecords: []
    },
    {
      id: "CUST-0003",
      name: "Alex Chen",
      email: "alex.chen@email.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      source: "Store",
      status: "VIP",
      lastContact: "30 minutes ago",
      engagementScore: 95,
      nextRecommendationDate: "2024-01-22",
      totalSpent: 3800,
      averageOrderValue: 380,
      notes: "Premium customer who shops frequently. Loves luxury items and is always first to try new collections. High referral potential.",
      purchaseHistory: [
        {
          id: "purchase-005",
          productName: "Designer Leather Jacket",
          category: "Jackets",
          size: "L",
          color: "Black",
          price: 450,
          purchaseDate: "2024-01-18",
          rating: 5
        },
        {
          id: "purchase-006",
          productName: "Premium Wool Coat",
          category: "Coats",
          size: "L",
          color: "Charcoal",
          price: 320,
          purchaseDate: "2024-01-10",
          rating: 5
        }
      ],
      styleProfile: {
        preferredColors: ["Black", "Charcoal", "Navy", "White"],
        preferredStyles: ["Business", "Luxury", "Minimalist"],
        sizeProfile: "Large",
        priceRange: { min: 200, max: 600 },
        favoriteBrands: ["Our Brand", "Armani", "Hugo Boss"],
        occasions: ["Business", "Formal", "Special Events"]
      },
      messages: [
        {
          id: "msg-008",
          role: "ai",
          text: "Hi Alex! 👔 I know you love our premium pieces! We just received an exclusive limited-edition collection that I think you'd absolutely love. Want to be the first to see it?",
          timestamp: "30 minutes ago",
          platform: "WhatsApp",
          productSuggestions: ["Limited Edition Blazer", "Premium Cashmere Sweater"]
        },
        {
          id: "msg-009",
          role: "user",
          text: "Absolutely! I'm always interested in exclusive pieces. What's special about this collection?",
          timestamp: "25 minutes ago",
          platform: "WhatsApp"
        },
        {
          id: "msg-010",
          role: "ai",
          text: "It's our collaboration with a famous designer! Only 50 pieces available worldwide. I can reserve one for you and show you a virtual preview right now!",
          timestamp: "20 minutes ago",
          platform: "WhatsApp"
        }
      ],
      callRecords: [
        {
          id: "call-002",
          type: "outgoing",
          duration: "12:30",
          timestamp: "2 days ago",
          notes: "VIP customer check-in - very satisfied with recent purchases"
        }
      ]
    },
    {
      id: "CUST-0004",
      name: "Sophie Williams",
      email: "sophie.w@email.com",
      phone: "+1 (555) 321-0987",
      location: "Miami, FL",
      source: "Instagram",
      status: "New",
      lastContact: "15 minutes ago",
      engagementScore: 65,
      nextRecommendationDate: "2024-01-30",
      totalSpent: 450,
      averageOrderValue: 225,
      notes: "New customer who discovered us through influencer collaboration. Very engaged on social media. Interested in beachwear and summer collections.",
      purchaseHistory: [
        {
          id: "purchase-007",
          productName: "Beach Cover-Up",
          category: "Swimwear",
          size: "M",
          color: "Tropical Blue",
          price: 79,
          purchaseDate: "2024-01-20",
          rating: 4
        },
        {
          id: "purchase-008",
          productName: "Summer Maxi Dress",
          category: "Dresses",
          size: "M",
          color: "Floral Print",
          price: 129,
          purchaseDate: "2024-01-18",
          rating: 5
        }
      ],
      styleProfile: {
        preferredColors: ["Blue", "Floral", "White", "Pink"],
        preferredStyles: ["Beach", "Summer", "Feminine"],
        sizeProfile: "Medium",
        priceRange: { min: 50, max: 200 },
        favoriteBrands: ["Our Brand", "Free People", "Anthropologie"],
        occasions: ["Beach", "Vacation", "Summer Events"]
      },
      messages: [
        {
          id: "msg-011",
          role: "ai",
          text: "Hi Sophie! 🌺 I saw you loved our summer collection! We're launching our new tropical collection next week. Would you like an early preview?",
          timestamp: "15 minutes ago",
          platform: "Instagram",
          productSuggestions: ["Tropical Bikini", "Palm Print Dress"]
        },
        {
          id: "msg-012",
          role: "user",
          text: "Yes! I'm planning a tropical vacation next month!",
          timestamp: "10 minutes ago",
          platform: "Instagram"
        },
        {
          id: "msg-013",
          role: "ai",
          text: "Perfect timing! Let me show you our new tropical pieces and create some vacation looks for you! 🏝️",
          timestamp: "5 minutes ago",
          platform: "Instagram"
        }
      ],
      callRecords: []
    }
  ]

  return customers
}
