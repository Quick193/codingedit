# Raise

Full-stack crowdfunding platform with React, Express, MongoDB, JWT authentication, and analytics.

## Features
- Public campaign discovery and donation flow (no account required).
- Creator authentication with JWT and dashboard analytics.
- Campaign creation, editing, and completion management.
- Donation timeline charting with Chart.js.
- Responsive UI using Tailwind CSS.

## Tech Stack
- **Frontend:** React + Vite, React Router, Axios, Chart.js, Tailwind CSS.
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt.
- **Deployment:** Vercel (frontend) and Render (backend).

## Getting Started

### Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev` (port 5000 by default)

### Frontend
1. `cd frontend`
2. Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL (e.g., `http://localhost:5000/api`).
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev` (Vite on port 5173)

## Deployment
- Vercel configuration in `frontend/vercel.json`.
- Render configuration in `backend/render.yaml`.
