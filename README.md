# 📱 Contact Book

A modern, full-stack Contact Book application with a beautiful dark theme UI and robust backend API.

## ✨ Features

- **Modern UI**: Dark theme with glass morphism effects
- **Responsive Design**: Works perfectly on all devices
- **Contact Management**: Add, view, and delete contacts
- **Pagination**: Efficient contact listing
- **Real-time Updates**: Instant UI updates
- **Form Validation**: Client and server-side validation

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Styling**: Modern CSS with animations
- **Deployment**: Vercel ready

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/EswarChittala/Contact_book.git
cd Contact_book
```

2. **Install all dependencies**
```bash
npm run install:all
```

3. **Set up environment variables**
```bash
# Backend
cp backend/env.example backend/.env
# Edit backend/.env with your MongoDB URI

# Frontend
cp frontend-react/env.example frontend-react/.env
# Edit frontend-react/.env with your API URL
```

4. **Start development servers**
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend  # Backend on http://localhost:5000
npm run dev:frontend # Frontend on http://localhost:5173
```

## 📁 Project Structure

```
Contact_book/
├── backend/                 # Express API server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── package.json
│   └── server.js
├── frontend-react/         # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── package.json            # Root package.json
├── .gitignore
└── README.md
```

## 🌐 API Endpoints

- `POST /api/contacts` - Create new contact
- `GET /api/contacts` - Get contacts with pagination
- `DELETE /api/contacts/:id` - Delete contact

## 🚀 Deployment

### Vercel Deployment
1. Deploy backend to Vercel
2. Deploy frontend to Vercel
3. Update frontend environment variable with backend URL

## 📄 License

MIT License
