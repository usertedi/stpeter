# St. Peter Orthodox Gibi Gubae

Official website and admin portal for Kidus Petros Gibi Gubae.

## Tech Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, SWR
- Backend: Node.js, Express, MongoDB/Mongoose, JWT auth, Cloudinary, Nodemailer
- Deployment: Vercel for the frontend, Render/Heroku or another Node host for the backend, MongoDB Atlas for the database

## Prerequisites

- Node.js 20 LTS or newer
- npm
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account for gallery uploads
- SMTP/email credentials for contact notifications and password reset

## Local Development

1. Install dependencies:

```bash
cd frontend
npm install

cd ../backend
npm install
```

2. Configure environment variables:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Set `NEXT_PUBLIC_API_URL` in the frontend to the backend origin, usually `http://localhost:5000` locally.

3. Start the backend:

```bash
cd backend
npm run dev
```

4. Start the frontend:

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000`.

## Admin Setup

The temporary admin setup endpoint is available in development. In production, only enable it briefly with:

- `ENABLE_ADMIN_SETUP=true`
- `ADMIN_SETUP_TOKEN=<one-time-secret>`

Send the setup token in the `x-setup-token` header, then disable setup again after creating the first admin.

## Useful Commands

```bash
# Frontend
cd frontend
npm run lint
npm run build

# Backend
cd backend
npm test
npm run dev
```

## API Health

The backend exposes:

- `GET /api` for a simple API check
- `GET /api/health` for uptime/status checks

## Production Checklist

- Configure all variables from `backend/.env.example` and `frontend/.env.example`.
- Keep `ENABLE_ADMIN_SETUP=false` after bootstrapping.
- Use a long random `JWT_SECRET`.
- Restrict `FRONTEND_URL` and CORS origins to trusted domains.
- Configure Cloudinary and email credentials before enabling gallery uploads/contact notifications.
- Run CI, frontend build, and backend tests before deploy.

## Project Structure

```text
frontend/
  src/app/          Next.js App Router pages and route handlers
  src/components/   Public and admin React components
  src/hooks/        SWR-backed data hooks
  src/lib/          API and site utilities

backend/
  src/controllers/  Express route handlers
  src/middleware/   Auth, validation, async, and error middleware
  src/models/       Mongoose schemas and indexes
  src/routes/       API route definitions
  src/utils/        Shared backend helpers
  src/server.js     Express entry point
```
