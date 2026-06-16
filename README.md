# FinanceAI Dashboard

A modern, high-performance financial dashboard built with React 19, Vite, and Tailwind CSS. Demonstrates advanced UI patterns including glassmorphism, animated page transitions, and interactive charts.

## 🚀 Features

- **Glassmorphism Design:** Modern, premium aesthetic with ambient background glows and frosted glass panels.
- **Interactive Charts:** Powered by Recharts with custom tooltips, gradients, and entrance animations.
- **Dynamic Data:** Mock data layer with CRUD operations, realistic date ranges, and category aggregation.
- **Simulated AI Assistant:** A typewriter-effect AI chat interface that parses user queries to provide contextual financial advice.
- **Smooth Animations:** Framer Motion staggered entrances, page transitions, and progress bar fills.
- **Protected Routes:** Context-based authentication state management.
- **Responsive Layout:** Desktop sidebar, mobile bottom navigation, and floating action button.

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS (Material Design 3 tokens)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Routing:** React Router v7
- **Icons:** Material Symbols Rounded

## 📦 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/financeai-dashboard.git
   cd financeai-dashboard
   ```

2. Install dependencies (using npm workspaces):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev --workspace=apps/dashboard
   ```

4. Open `http://localhost:5173` in your browser.

## 🏗 Architecture

This project is structured as an npm monorepo:

- `/apps/dashboard`: The main React application
- `/apps/server`: Express/Drizzle backend (optional)
- `/packages/ui`: Shared React components (Icon, GlassCard, NavItem)

## 🔒 Authentication

The app features a simulated local authentication system. To log in during the demo, click "Sign In" on the login page (no actual credentials required).

## 📄 License

MIT
