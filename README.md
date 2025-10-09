# 📱 CalorieTracker

Modern mobile-first calorie and nutrition tracking app.

## Features

- Track calories, protein, carbs, and fats
- Mobile-optimized with PWA support
- Dark theme interface
- Real-time progress charts

## Quick Start

```bash
# Backend
cd backend
npm install
docker-compose up -d
npm run dev

# Frontend (new terminal)
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Open **http://localhost:5173**

## Tech Stack

- React 19 + Vite + Tailwind CSS
- Node.js + Express + Prisma
- PostgreSQL + Docker
- Firebase Auth

## Setup

Create `.env` files:

**backend/.env**

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/calorietracker"
PORT=3001
```

**frontend/.env**

```env
VITE_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=demo-api-key-for-development
```

> Use `demo-api-key-for-development` to bypass authentication in dev mode
