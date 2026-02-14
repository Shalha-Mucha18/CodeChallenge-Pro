# 🎯 CodeChallenge Pro

> Master coding with AI-powered challenges

A modern, full-stack web application that generates personalized coding challenges using AI. Built with React, FastAPI, and powered by Groq AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](https://github.com/Shalha-Mucha18/CodeChallenge-Pro)

## ✨ Features

*   **AI-Powered Challenges:** Generate coding questions (Easy, Medium, Hard) with detailed explanations using Groq AI.
*   **Secure Auth:** Clerk integration for secure sign-in and session management.
*   **Smart Quota:** 5 free challenges/day with auto-reset to ensure fair usage.
*   **History Tracking:** Review past challenges and filter by difficulty.
*   **Modern UI:** Responsive, glassmorphism design with dark mode and smooth animations.

## 🛠️ Tech Stack

*   **Frontend:** React 19, Vite, Clerk (Auth), CSS3 (Glassmorphism)
*   **Backend:** FastAPI, Python 3.10+, SQLAlchemy (SQLite), Groq AI SDK

## 🚀 Quick Start

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/Shalha-Mucha18/CodeChallenge-Pro.git
    cd CodeChallenge-Pro
    
    # Backend
    cd backend
    pip install uv && uv sync # or pip install -r requirements.txt
    cp .env.example .env # Add CLERK_SECRET_KEY, JWT_KEY, GROQ_API_KEY
    
    # Frontend
    cd ../frontend
    npm install
    cp .env.example .env # Add VITE_CLERK_PUBLISHABLE_KEY
    ```

2.  **Run Application:**
    *   **Backend:** `uv run -m src.server` (http://localhost:8000)
    *   **Frontend:** `npm run dev` (http://localhost:5173)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shalha Mucha** - GitHub: [@Shalha-Mucha18](https://github.com/Shalha-Mucha18)
