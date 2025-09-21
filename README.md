# Contact Book (React + Vite + Express + MongoDB)

This is a full-stack Contact Book project:
- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: React (Vite)

Features:
- Add contact with validation (name, email, 10-digit phone)
- List contacts with pagination
- Delete contact

---

## Setup

### Backend
Requirements: Node.js >= 16, MongoDB (local or Atlas)

```bash
cd backend
cp .env.example .env   # adjust MONGODB_URI
npm install
npm start
```

Runs on http://localhost:5000

### Frontend (React + Vite)
```bash
cd frontend-react
npm install
npm run dev
```

Open http://localhost:5173

---

## Build for production
```bash
cd frontend-react
npm run build
npm run preview
```

---

## API Endpoints
- POST /api/contacts
- GET /api/contacts?page=&limit=
- DELETE /api/contacts/:id

---

You can deploy:
- Backend: to Heroku, Render, Railway
- Frontend: Netlify, Vercel, etc (build with `npm run build`)
