✈️ FlightBooker — Full-Stack Flight Booking System

FlightBooker is a production-ready full-stack flight booking platform built to demonstrate real-world backend engineering, database design, and deployment practices.
The project supports user authentication, flight search, filtering, dynamic pricing, and bookings with a modern frontend and scalable backend.

🔗 Live Demo

Frontend: https://flight-booker-gamma.vercel.app

Backend: https://flightbooker-5bzt.onrender.com

🚀 Key Highlights

✅ End-to-end full-stack application

✅ Production deployment (Render + Vercel)

✅ Prisma ORM with PostgreSQL

✅ JWT-based authentication

✅ Database migrations & seeding

✅ Proper environment separation (local vs production)

🧰 Tech Stack
Frontend

React (Vite)

Axios

Tailwind CSS

Deployed on Vercel

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL

JWT Authentication

Deployed on Render

⚙️ Environment Variables
Backend (backend/.env – local)
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/flight_booking

JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

WALLET_INITIAL_BALANCE=50000
SURGE_PRICING_THRESHOLD=3
SURGE_PRICING_PERCENTAGE=10
SURGE_RESET_MINUTES=10

CORS_ORIGIN=http://localhost:5173

Frontend (frontend/.env – local)
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=FlightBooker

🖥️ Running the Project Locally
1️⃣ Clone the Repository
git clone https://github.com/iashutoshyadav/FlightBooker.git
cd FlightBooker

2️⃣ Backend Setup
cd backend
npm install

Database Setup

Create a PostgreSQL database

Update DATABASE_URL in .env

Prisma Setup
npx prisma generate
npx prisma migrate dev
npx prisma db seed

Start Backend
npm run dev


Backend will run on:
👉 http://localhost:5000

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend will run on:
👉 http://localhost:5173

🌍 Production Deployment
Backend (Render)

Build Command

npm install && npm run build


Start Command

npm start


Production Environment Variables

NODE_ENV=production
PORT=10000
DATABASE_URL=your_render_postgres_url
JWT_SECRET=your_secret
CORS_ORIGIN=https://flight-booker-gamma.vercel.app

Frontend (Vercel)

Environment Variables

VITE_API_URL=https://flightbooker-5bzt.onrender.com/api
VITE_APP_NAME=FlightBooker

🔗 Live Endpoints

Frontend UI
👉 https://flight-booker-gamma.vercel.app

Backend API
👉 https://flightbooker-5bzt.onrender.com

Health Check
👉 https://flightbooker-5bzt.onrender.com/api/health

✨ Features

User Registration & Login

JWT-based Authentication

Flight Search (From → To)

Airline & Price Filters

Dynamic Pricing (Surge Logic)

Flight Booking

Wallet System

Production-ready error handling

Secure environment configuration

🧠 Engineering Notes

Prisma migrations are used for schema management.

Production database is seeded once using prisma db seed.

Backend strictly binds to process.env.PORT (cloud-safe).

.env files are excluded from version control.

Designed following real-world backend deployment practices.

👨‍💻 Author

Ashutosh Yadav
Final-year B.Tech | Full-Stack Developer
