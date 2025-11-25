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

### Quick start (root)
1. From the repo root run `npm run install:all` to install both backend and frontend dependencies (this also runs automatically before `npm start` or `npm run dev`).
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and `JWT_SECRET`. If `MONGO_URI` is omitted, the backend will attempt to connect to `mongodb://127.0.0.1:27017/raise`. If a local MongoDB instance is unavailable, an in-memory database will start automatically so you can run the app without installing MongoDB (disable by setting `ENABLE_IN_MEMORY_DB=false`).
3. Copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL` (e.g., `http://localhost:5000/api`). If the backend logs that it moved to another port (for example, port 5001 when 5000 is busy), update `VITE_API_URL` to match the port printed in the backend console.
4. Start both servers concurrently: `npm run dev` **or** `npm start` (backend on port 5000 by default, frontend on port 5173). If port 5000 is taken, the backend will automatically try the next available port and log the chosen port. The backend automatically loads environment variables from `backend/.env` even when started via root workspace scripts.
5. Open the frontend URL printed by Vite (defaults to `http://localhost:5173`). Visiting the backend port directly (e.g., `http://localhost:5000` or `http://localhost:5001` after a retry) will show only the API JSON message; use the Vite URL for the full app UI.

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
