# 👗 LeadCall AI — Fashion CRM Reactivation with Visual Personalization

> “We don’t sell clothes — we **reconnect emotions** between people and style.”

---

### 🧠 What’s the problem?

Fashion brands are losing millions in missed sales.  
Their CRMs (Bitrix, AmoCRM, etc.) are full of **inactive leads** — just phone numbers or old customers who stopped responding.  
Sales managers don’t have time to reach everyone, and cold calls no longer work.

At the same time, customers expect **personalized shopping experiences**, not generic promotions.  
They want to feel *seen* and *understood*, not just sold to.

---

### 💡 Our solution

LeadCall AI brings **human-like personalization** to the fashion industry.  
Instead of sending the same message to everyone, our AI agent creates **visual, emotional, and personalized outreach** for every lead.

For example:
> “Hey Aziza 👋, we just dropped a new collection — and I think this one would look *amazing* on you 😍”  
> *(Image preview showing Aziza’s own photo wearing the outfit)*  

It’s not just marketing — it’s **AI-powered styling and reactivation** combined.

---

### 🎯 How it works

1. **Import your leads** from AmoCRM, Bitrix, or CSV (even if they only have a phone number).  
2. **AI enriches profiles** with public info (name, gender, style hints, behavior data).  
3. **Visual personalization engine** generates an outfit preview using user photos or style references.  
4. **AI outreach agent** sends tailored messages through WhatsApp, Telegram, or SMS — using tone and visuals that match the person’s taste.  
5. **Dashboard** tracks replies, engagement, and reactivated leads in real time.

---

### 🌍 Why fashion?

Because fashion is emotional.  
People don’t buy clothes; they buy **confidence**, **identity**, and **how they feel wearing them**.  
That’s why our outreach isn’t about pushing discounts — it’s about **building emotional connection at scale**.

- 65% of fashion e-commerce carts are abandoned.  
- 80% of returning customers buy again when contacted with a personalized message.  
- Visual personalization increases conversion by **2.5×** on average.

---

### ⚙️ Architecture Overview

| Component | Description |
|------------|--------------|
| **Frontend (Next.js)** | Landing + Web Dashboard (`leadcall.uz`, `app.leadcall.uz`) |
| **Backend (DRF)** | Core API for CRM integration (`api.leadcall.uz`, Swagger at `/docs`) |
| **Outreach Service (FastAPI)** | Handles AI outreach calls & messaging (`call.leadcall.uz`) |
| **AI Layer** | Generates personalized messages, outfit visualizations, and recommendations |

---

### 🔮 Core Features

#### 👩‍💻 1. Smart Lead Reactivation
AI automatically segments cold leads and launches reactivation campaigns.  
Works with **AmoCRM** and **Bitrix24** using webhook or API integration.

#### 🧥 2. Visual Outfit Generator (AI Styling)
Upload a user’s photo → our AI “tries” the outfit virtually and creates a preview message.  
If no photo is available, the system uses **AI-generated look-alikes** based on style or gender.

#### 💬 3. Emotion-based Messaging
AI detects tone and emotion, then adjusts outreach style:  
- Friendly & casual for repeat customers  
- Confident & concise for high-end clients  
- Curious & visual for new leads  

#### 📞 4. Call & Messaging Integration
Fully automated outreach through:
- WhatsApp
- Telegram
- SMS  
- Optional voice call with synthetic voice via `call.leadcall.uz`

#### 📊 5. Real-time Dashboard
- Reactivation stats (Replied, Interested, Re-engaged)  
- AI success rate & engagement charts  
- ROI calculator: *“hidden revenue unlocked”*  

---

### 🔐 For CRMs with only phone numbers (AmoCRM / Bitrix)
Even if the CRM only contains phone numbers, the system can:
1. **Use reverse lookup / phone enrichment** to find public data (first name, gender, city).  
2. **Generate AI persona** based on available attributes (e.g. “female, 25–35, Tashkent”).  
3. Create personalized, realistic messages using that context.  
4. Add interaction history back to CRM via webhook.

Example message:
> “Hi there 👗 We noticed you loved our summer collection last year!  
> Here’s something new that matches your style 💜 Want to take a look?”  

---

### 🧱 Tech Stack

**Frontend**
- Next.js 14 + TailwindCSS + Framer Motion  
- shadcn/ui components  
- Recharts (analytics)  
- i18n (en/uz/ru)

**Backend**
- Django REST Framework  
- JWT Auth + CORS + Swagger docs  
- PostgreSQL  
- Celery + Redis for async outreach  
- Integration-ready webhooks for AmoCRM, Bitrix

**Outreach Service**
- FastAPI microservice (`call.leadcall.uz`)  
- Handles voice AI, message sending, and campaign execution  
- Can scale horizontally for bulk outreach

---

### 🧪 How to run locally

```bash
# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Outreach service
cd outreach
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev


