# 🎯 CodeChallenge Pro

> Master coding with AI-powered challenges

A modern, full-stack web application that generates personalized coding challenges using AI. Built with React, FastAPI, and powered by Groq AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)

![CodeChallenge Pro](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

---

## ✨ Features

### 🎓 **AI-Powered Challenge Generation**
- Generate coding challenges using Groq's advanced AI models
- Three difficulty levels: Easy, Medium, Hard
- Multiple-choice questions with detailed explanations
- Instant feedback on answers

### 🔐 **Secure Authentication**
- Clerk authentication integration
- Protected routes and API endpoints
- JWT-based authorization
- User session management

### 📊 **Smart Quota System**
- 5 free challenges per day
- Automatic 24-hour reset
- Visual quota indicators
- Fair usage enforcement

### 📚 **Challenge History**
- Track all completed challenges
- Filter by difficulty level
- Statistics dashboard
- Performance insights

### 🎨 **Modern UI/UX**
- Glassmorphism design
- Smooth animations
- Dark theme optimized
- Fully responsive
- Professional typography (Inter font)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+
- **Git**
- **Clerk Account** (for authentication)
- **Groq API Key** (for AI generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shalha-Mucha18/CodeChallenge-Pro.git
   cd CodeChallenge-Pro
   ```

2. **Setup Backend**
   ```bash
   cd backend
   
   # Install dependencies with uv (recommended)
   pip install uv
   uv sync
   
   # Or use pip
   pip install -r requirements.txt
   
   # Create .env file
   cp .env.example .env
   # Add your API keys to .env
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Create .env file
   cp .env.example .env
   # Add your Clerk publishable key
   ```

4. **Configure Environment Variables**

   **Backend** (`backend/.env`):
   ```env
   CLERK_SECRET_KEY=your_clerk_secret_key
   JWT_KEY=your_clerk_jwt_key
   GROQ_API_KEY=your_groq_api_key
   ```

   **Frontend** (`frontend/.env`):
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

5. **Run the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   uv run -m src.server
   # Backend runs on http://localhost:8000
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🏗️ Architecture

### Tech Stack

#### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Clerk** - Authentication
- **CSS3** - Modern styling with gradients and glassmorphism

#### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Database (easily swappable with PostgreSQL)
- **Clerk SDK** - Authentication verification
- **Groq AI** - Challenge generation
- **Uvicorn** - ASGI server

### Project Structure

```
CodeChallenge-Pro/
├── backend/
│   ├── src/
│   │   ├── app.py              # FastAPI application
│   │   ├── server.py           # Development server
│   │   ├── ai_generator.py     # Groq AI integration
│   │   ├── utils.py            # Auth utilities
│   │   ├── database/
│   │   │   ├── models.py       # SQLAlchemy models
│   │   │   └── db.py           # CRUD operations
│   │   └── routers/
│   │       ├── challenge.py    # API endpoints
│   │       └── webhooks.py     # Clerk webhooks
│   ├── pyproject.toml          # Python dependencies
│   └── main.py                 # Entry point
│
└── frontend/
    ├── src/
    │   ├── main.jsx            # React entry point
    │   ├── App.jsx             # Main app component
    │   ├── auth/               # Authentication components
    │   ├── challenge/          # Challenge components
    │   ├── history/            # History components
    │   ├── layout/             # Layout components
    │   └── utils/              # Utility functions
    ├── package.json            # Node dependencies
    └── vite.config.js          # Vite configuration
```

---

## 📡 API Endpoints

### Challenge Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/challenges/generate_challenge` | Generate new challenge | ✅ Yes |
| `GET` | `/challenges/my-history` | Get user's challenge history | ✅ Yes |
| `GET` | `/challenges/quota` | Get remaining quota | ✅ Yes |
| `POST` | `/challenges/test_generate` | Test endpoint (dev only) | ❌ No |

### Request/Response Examples

**Generate Challenge:**
```bash
curl -X POST http://localhost:8000/challenges/generate_challenge \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"difficulty": "easy"}'
```

**Response:**
```json
{
  "difficulty": "easy",
  "title": "What is the output of print(type([]))?",
  "options": ["<class 'list'>", "<class 'dict'>", "<class 'tuple'>", "list"],
  "correct_answer": "<class 'list'>",
  "correct_answer_id": 0,
  "explanation": "The type() function returns the type of an object..."
}
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-success: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

/* Background */
--background: #0a0a1f;
--surface: rgba(255, 255, 255, 0.05);
--glass: rgba(255, 255, 255, 0.08);
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800
- **Line Height**: 1.6

---

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ JWT-based authentication
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Rate limiting (5 challenges/day)
- ✅ Input validation
- ✅ SQL injection protection (SQLAlchemy ORM)

### Security Best Practices

1. **Never commit `.env` files**
2. **Rotate API keys regularly**
3. **Use HTTPS in production**
4. **Restrict CORS origins in production**
5. **Remove test endpoints before deployment**

---

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Backend (Railway/Render)

1. Create new service
2. Connect GitHub repository
3. Add environment variables
4. Set start command: `uvicorn src.app:app --host 0.0.0.0 --port $PORT`
5. Deploy

### Environment Variables for Production

**Backend:**
```env
CLERK_SECRET_KEY=prod_clerk_secret
JWT_KEY=prod_jwt_key
GROQ_API_KEY=prod_groq_key
DATABASE_URL=postgresql://... (optional)
```

**Frontend:**
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
VITE_API_URL=https://your-backend.railway.app
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Manual Testing
Use the test script:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

## 📝 Development

### Code Style

- **Python**: PEP 8, Black formatter
- **JavaScript**: ESLint with React rules
- **Commits**: Conventional commits format

### Adding New Features

1. Create a new branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make your changes
3. Test thoroughly
4. Commit with descriptive message
   ```bash
   git commit -m "feat: add new feature"
   ```

5. Push and create PR
   ```bash
   git push origin feature/your-feature
   ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shalha Mucha**
- GitHub: [@Shalha-Mucha18](https://github.com/Shalha-Mucha18)

---

## 🙏 Acknowledgments

- [Clerk](https://clerk.com/) - Authentication
- [Groq](https://groq.com/) - AI API
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [React](https://react.dev/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool

---

## 📞 Support

For support, email support@codechallengepro.com or open an issue on GitHub.

---

## 🗺️ Roadmap

- [ ] Add more challenge types (coding exercises, debugging)
- [ ] Implement leaderboard
- [ ] Add social sharing
- [ ] Mobile app (React Native)
- [ ] Premium subscription tier
- [ ] Custom challenge creation
- [ ] Team challenges
- [ ] Progress tracking and analytics

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ using AI and modern web technologies

</div>
