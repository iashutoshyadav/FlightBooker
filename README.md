 Flight Booking System (Full-Stack)

A full-stack Flight Booking System built with React (Vite), Node.js + Express, Prisma, and PostgreSQL, featuring authentication, flight search, dynamic pricing, and bookings.

🧱 Tech Stack
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

Project Structure
FlightBooker/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
│
└── README.md

 Environment Variables
Backend .env (Local)
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

Frontend .env (Local)
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Flight Booking System

Run Project Locally
1️ Clone Repository
git clone https://github.com/iashutoshyadav/FlightBooker.git
cd FlightBooker

2️ Backend Setup
cd backend
npm install

Setup Database

Create PostgreSQL database

Update DATABASE_URL in .env

Run Prisma
npx prisma generate
npx prisma migrate dev
npx prisma db seed

Start Backend
npm run dev


Backend runs at:

http://localhost:5000

3️ Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🌐Production Deployment
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
VITE_APP_NAME=Flight Booking System

🔗 Live URLs

Frontend: https://flight-booker-gamma.vercel.app

Backend: https://flightbooker-5bzt.onrender.com

Health Check: https://flightbooker-5bzt.onrender.com/api/health

 Features

User Registration & Login (JWT)

Flight Search (From → To)

Filters (Airline, Price)

Dynamic Pricing (Surge logic)

Flight Booking

Wallet Balance

Production-ready backend

Secure environment configuration

 Notes

Prisma migrations are run automatically in production.

Flight data is seeded once using prisma db seed.

.env files are never committed.

Uses process.env.PORT for cloud compatibility.

📌 Author

Ashutosh Yadav
Full-Stack Developer
