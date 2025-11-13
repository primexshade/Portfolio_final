# MERN Portfolio

A modern, minimal, and highly functional developer portfolio built with the MERN stack (MongoDB, Express, React, Node). Dark-first UI inspired by GitHub, Microsoft, and Amazon.

## Tech
- Frontend: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, React Router, Axios, Recharts, react-github-calendar
- Backend: Node, Express, Mongoose, Nodemailer, Helmet, Rate Limit, CORS
- DB: MongoDB Atlas
- Deploy: Client on Vercel, Server on Render

## Quick start
1. Copy env template and fill values: `server/.env.example` -> `server/.env`
2. Install deps for both apps:
   - Root: `npm run install-all`
3. Run both apps in dev:
   - Root: `npm run dev`

## Deploy
- Client: Connect repo to Vercel, set `VITE_API_BASE_URL` to your server URL
- Server: Deploy to Render, set env vars from `server/.env.example`
- DB: Create a free cluster on MongoDB Atlas and use its connection string

## Structure
See `client/` and `server/` folders for code and detailed READMEs.
