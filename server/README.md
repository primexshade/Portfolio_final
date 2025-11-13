# Server (Express + MongoDB)

## Scripts
- `npm run dev` — start with nodemon
- `npm start` — start production

## Env
Copy `.env.example` to `.env` and fill values.

## Endpoints
- `GET /api/health` — health check
- `GET /api/projects` — list projects
- `POST /api/projects` — create project
- `POST /api/contact` — submit a contact message
- `GET /api/github?username=<user>` — proxy GitHub user (optional)
- `GET /api/leetcode?username=<user>` — proxy LeetCode stats (optional)

## Deployment
- Render: create a web service, set `Build Command`: `npm install`, `Start Command`: `npm start`. Add env vars.
