# 📱 CalorieTracker - Mobile-First Nutrition App

A modern, mobile-optimized calorie and nutrition tracking app built with React and Node.js. Features a sleek design, PWA capabilities, and intuitive mobile-first user experience.

## ✨ Features

### 🎯 Core Features

- **Smart Food Logging** - Quick and easy meal tracking with preset foods
- **Nutrition Dashboard** - Visual progress tracking with interactive charts
- **Daily Goals** - Set and monitor calorie and macronutrient targets
- **Real-time Analytics** - Instant feedback on your nutrition intake

### 📱 Mobile Optimizations

- **Mobile-First Design** - Optimized for touch interactions and small screens
- **Bottom Tab Navigation** - Native app-like navigation experience
- **Touch-Friendly Forms** - Optimized inputs with proper keyboard types
- **Progressive Web App** - Install directly to your phone's home screen
- **Offline Support** - Works without internet connection
- **Fast Performance** - Optimized loading and smooth animations

### 🎨 Modern UI/UX

- **Dark Theme** - Easy on the eyes with a modern dark interface
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Works perfectly on all screen sizes
- **Custom Charts** - Lightweight, touch-friendly data visualizations
- **Loading States** - Elegant loading indicators and error handling

## 🚀 Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and gestures
- **Zustand** - Lightweight state management
- **PWA Support** - Service worker and manifest

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Prisma ORM** - Database toolkit and query builder
- **PostgreSQL** - Robust relational database
- **Docker** - Containerized database setup

### Additional Tools

- **Firebase Auth** - Secure user authentication
- **Axios** - HTTP client with interceptors
- **Lucide React** - Beautiful icon library

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/zavenr/calorie-tracker.git
   cd calorie-tracker
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Start PostgreSQL with Docker
   docker-compose up -d

   # Setup database
   npm run db:push
   npm run db:generate

   # Start development server
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install

   # Start development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Database Studio: `npm run db:studio` (in backend directory)

### Environment Variables

Create `.env` files in both directories:

**Backend (.env)**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/calorietracker"
PORT=3001
```

**Frontend (.env)**

```env
VITE_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 📱 Mobile Usage

### Install as PWA

1. Open the app in your mobile browser
2. Tap the "Add to Home Screen" option
3. The app will install like a native app
4. Launch from your home screen for the full experience

### Mobile Features

- **Bottom Navigation** - Easy thumb navigation on mobile
- **Swipe Gestures** - Natural mobile interactions
- **Keyboard Optimization** - Numeric keyboards for number inputs
- **Safe Area Support** - Respects device notches and home indicators

## 🎯 Usage Guide

### Adding Food

1. Tap the "+" button in the navigation
2. Enter food name and nutritional information
3. Use quick presets for common foods
4. Save to automatically update your daily totals

### Viewing Progress

1. Navigate to Dashboard to see today's progress
2. View calorie progress ring and macro breakdown
3. Check recent foods and daily trends
4. Monitor goals vs actual intake

### Setting Goals

- Default goals are set for 2500 calories
- Macros: 150g protein, 300g carbs, 80g fats
- Goals can be customized (feature coming soon)

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku)

```bash
cd backend
# Set environment variables on your platform
# Deploy with automatic database setup
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Zaven** - [zavenran@gmail.com](mailto:zavenran@gmail.com)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern mobile apps
- Built with modern web technologies

---

**Star ⭐ this repository if you found it helpful!**
