# ReGeno 🎮

> **ReGeno India Marketplace** – The ultimate marketplace for certified retro and modern gaming hardware.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ea4c89)

ReGeno is a modern, high-performance web application designed for gamers. Browse curated selections of legendary consoles, explore deep game libraries, and instantly get quotes to sell your battle-tested gear. It features a complete multi-step wizard for selling hardware, smooth animations, and a sleek dark-themed Glassmorphism aesthetic.

## 🚀 Features

- **Multi-page Architecture**: Fully integrated React Router setup with specialized pages for `Home`, `Consoles`, `Games`, `Accessories`, and `Sell`.
- **"Sell Your Gear" Wizard**: A beautifully custom 4-step wizard combining interactive hardware catalogs, dynamic search, conditions multipliers, and instantaneous quote generation.
- **Glassmorphic Design**: Modern, premium dark theme (Stealth Black `#0D0D0D` with Electric Purple `#B000FF` accents) making the interface feel authentic, alive, and interactive.
- **Dynamic Animations**: Fluid route transitions and step progression tracking powered flawlessly by `framer-motion`.

## 🛠 Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: `react-router-dom`
- **Styling**: Tailwind CSS
- **Animations**: `framer-motion`
- **Icons**: `lucide-react`

## 📦 Project Structure

```text
ReGeno/
├── frontend/             # Main application workspace
│   ├── src/
│   │   ├── components/   # Reusable UI elements (Header, Footer, ProductCards)
│   │   ├── pages/        # Route boundaries (Home, Consoles, Games, Sell, etc.)
│   │   └── data/         # Logic constants and the product/hardware catalog
│   ├── App.tsx           # Application route hub
│   └── index.css         # Global utilities & Tailwind implementation
```

## 💻 Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dhairyansh-raj05/ReGeno.git
   cd ReGeno/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` to see the application in action.

---

*Built for gamers, engineered for performance.*
