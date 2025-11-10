# Talent Sprint Classes

Educational platform built with Next.js 14 and TypeScript.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# 3. Run
npm run dev
```

Open http://localhost:3000

## Features

**Admin**: Manage students, teachers, content  
**Student**: Download materials, take exams, submit feedback  
**Teacher**: Upload materials, create tests  
**Public**: Home, courses, gallery, contact

## Stack

Next.js 14 • TypeScript • Firebase • Tailwind CSS • Chart.js

## Structure

```
app/              # Pages & routes
features/         # Feature modules (admin/student/teacher/home)
lib/firebase/     # Firebase utilities
types/            # TypeScript types
```

## Commands

```bash
npm run dev       # Development
npm run build     # Production build
npm start         # Run production
npm run lint      # Lint code
```

## Deploy

Push to GitHub → Import to Vercel → Add env vars → Deploy

---

© 2024 Talent Sprint Classes
