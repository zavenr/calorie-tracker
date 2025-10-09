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
DATABASE_URL="postgresql://username:your_password@localhost:5432/your_database"
PORT=3001
```

**frontend/.env**

```env
VITE_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
```

## Deployment

**Frontend:** Build with `npm run build`, deploy `dist/` folder  
**Backend:** Deploy to Railway/Heroku with PostgreSQL  
**Database:** Use managed PostgreSQL with strong credentials

## Author

Zaven - [Contact via GitHub Issues](https://github.com/zavenr/calorie-tracker/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
