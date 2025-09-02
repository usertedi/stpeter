# St. Peter Orthodox Church Website

A modern, responsive website for an Orthodox church organization built with Next.js, TailwindCSS, Node.js, Express, and MongoDB.

## Features

- **Home Page**: Welcoming introduction with hero section, mission statement, and links to key sections
- **About Page**: Story of the organization with images and timeline
- **Divisions Page**: Service divisions displayed in cards
- **Weekly Events Page**: Dynamic event schedule
- **Gallery Page**: Image grid with hover effects
- **Contact Page**: Social media links, map location, and contact form
- **Admin Portal**: Secured with JWT authentication for content management

## Tech Stack

### Frontend
- Next.js (React framework)
- TailwindCSS for styling
- Framer Motion for animations

### Backend
- Node.js + Express.js
- MongoDB for database
- Cloudinary for image storage
- JWT with bcrypt for authentication

### Deployment
- Vercel (frontend)
- Render/Heroku (backend)
- MongoDB Atlas (database)

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/stpeter-church.git
cd stpeter-church
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
- Create `.env.local` in the frontend directory
- Create `.env` in the backend directory

4. Run the development servers
```bash
# Run frontend
cd frontend
npm run dev

# Run backend
cd ../backend
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Deployment

#### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

#### Backend (Render/Heroku)
1. Push your code to GitHub
2. Connect your repository to Render or Heroku
3. Configure environment variables
4. Deploy

## Project Structure

```
/
├── frontend/                # Next.js frontend application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utility functions
│   │   ├── styles/         # Global styles
│   │   └── types/          # TypeScript types
│   ├── .env.local          # Environment variables (gitignored)
│   └── package.json        # Frontend dependencies
│
├── backend/                # Express.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── index.js        # Entry point
│   ├── .env                # Environment variables (gitignored)
│   └── package.json        # Backend dependencies
│
└── README.md              # Project documentation
```