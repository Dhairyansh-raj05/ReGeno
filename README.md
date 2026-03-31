# ReGeno 🎮

> **ReGeno India Marketplace** — The ultimate marketplace for certified retro and modern gaming hardware.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ea4c89)

ReGeno is a modern, high-performance web application built for Indian gamers. Browse curated selections of legendary consoles, explore deep game libraries, get instant sell quotes for your old hardware, and complete purchases with a smooth cart and checkout experience.

## Features

- **Full Auth System** — Sign up, sign in, profile page with order history via Supabase Auth
- **Product Catalog** — Consoles, games, and accessories with detail modals, specs, and condition badges
- **Cart & Checkout** — Animated cart drawer, delivery form, order confirmation with email notification
- **Sell Wizard** — 4-step flow to get an instant quote for your hardware
- **Admin Panel** — Protected dashboard to manage inventory and sell requests
- **AI Chatbot** — Geno, powered by Gemini, helps users find the right gear
- **Email Notifications** — Order and sell request confirmations via Resend

## Tech Stack

- **Frontend**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Supabase (Auth, PostgreSQL, Edge Functions)
- **Email**: Resend
- **AI**: Google Gemini API
- **Icons**: Lucide React

## Project Structure

```
ReGeno/
├── frontend/
│   ├── components/        # Shared UI (Header, Footer, ProductCard, etc.)
│   ├── src/
│   │   ├── components/    # CartDrawer, ProductModal, AdminLayout
│   │   ├── context/       # CartContext, AuthContext
│   │   ├── pages/         # Home, Consoles, Games, Sell, Auth, Profile, Admin
│   │   └── services/      # Supabase client
│   ├── types/             # TypeScript interfaces
│   └── App.tsx
└── supabase/
    ├── functions/
    │   └── send-order-email/   # Edge Function for email
    └── schema.sql              # Database schema
```

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Set up your `.env`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GEMINI_API_KEY=
```

Run the SQL in `supabase/schema.sql` in your Supabase dashboard to create all tables.

---

*Built for gamers, engineered for performance.*
