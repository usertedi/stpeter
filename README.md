# St. Peter Orthodox Gibi Gubae

Official website and admin portal for Kidus Petros Gibi Gubae at https://kiduspetros.com.

## Tech Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, SWR
- Backend: Node.js, Express, MongoDB/Mongoose, JWT auth, Cloudinary, Nodemailer
- Deployment: Vercel for the frontend, Render/Heroku or another Node host for the backend, MongoDB Atlas for the database

## Prerequisites

- Node.js 20 LTS or newer
- npm
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account for gallery uploads
- Resend API key (recommended for production on Render) or SMTP credentials for local email testing

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
- Set `NEXT_PUBLIC_SITE_URL=https://kiduspetros.com` so canonical URLs, sitemap, and JSON-LD use the public domain.
- Restrict `FRONTEND_URL` and CORS origins to trusted domains, including `https://kiduspetros.com`.
- Configure Cloudinary and email credentials before enabling gallery uploads/contact notifications.
- Run CI, frontend build, and backend tests before deploy.

## Email

**Contact form (app):** Submissions are saved to the admin **Messages** list and a copy is emailed to `CONTACT_NOTIFICATION_EMAIL` (default `yosefabay03@gmail.com`). Set `EMAIL_FROM` to `Kidus Petros <contact@kiduspetros.com>` in Resend after verifying `kiduspetros.com`.

**Inbound mail to contact@kiduspetros.com:** Use **Namecheap Email Forwarding** (domain on Namecheap, site on Vercel). If forwarding stopped after Resend, set **Advanced DNS → Mail Settings → Email Forwarding** again and keep Resend **Inbound** off on the root domain. See [docs/email-namecheap-resend.md](docs/email-namecheap-resend.md).

Render env vars:

| Variable | Example |
|----------|---------|
| `RESEND_API_KEY` | from Resend dashboard |
| `EMAIL_FROM` | `Kidus Petros <contact@kiduspetros.com>` |
| `CONTACT_NOTIFICATION_EMAIL` | `yosefabay03@gmail.com` |
| `FRONTEND_URL` | `https://kiduspetros.com` |

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
