# ⚖️ DSA Corporate Solutions — Law Firm Website

A full-stack corporate law firm website built with the MERN stack, featuring a polished public-facing interface and a secure backend API.

**Developed by:** Krishna Kumar

---

## 🌐 Live Preview
> Deployment in progress

---

## 📋 Project Overview

DSA Corporate Solutions required a modern, secure, and professional web presence reflecting its standing as a premier corporate law firm. This website serves as a digital hub for client acquisition, brand authority, and lead generation.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Styling | CSS3 + Custom Animations |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Email | Nodemailer |
| API | RESTful API |

---

## ✨ Features

- ✅ Responsive design across all devices
- ✅ Hero section with animations
- ✅ Practice Areas showcase
- ✅ Attorney profiles
- ✅ Client testimonials
- ✅ Contact / inquiry form with email notification
- ✅ Rate limiting & input validation
- ✅ MongoDB connected backend
- ✅ RESTful API for inquiries

---

## 📁 Folder Structure

Dsa-lawfirm/
├── dsa-frontend/          # React.js frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── PracticeArea.jsx
│       │   ├── Attorneys.jsx
│       │   ├── WhyUs.jsx
│       │   ├── Testimonials.jsx
│       │   ├── Contact.jsx
│       │   └── Footer.jsx
│       ├── hooks/
│       ├── assets/
│       └── styles/
└── dsa-backend/           # Node.js + Express backend
└── src/
├── config/        # DB & email config
├── controllers/
├── middleware/    # Auth, validation, rate limiter
├── models/
└── routes/

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/KrishnaKr01/DSA-lawfirm.git
cd DSA-lawfirm
```

### 2. Setup Backend
```bash
cd dsa-backend
npm install
```

Create a `.env` file in `dsa-backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Start the backend:
```bash
npm run dev
```
> Backend runs on **http://localhost:5000**

### 3. Setup Frontend
```bash
cd dsa-frontend
npm install
npm run dev
```
> Frontend runs on **http://localhost:5173**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/inquiries | Submit a client inquiry |
| GET | /api/inquiries | Get all inquiries (admin) |
| DELETE | /api/inquiries/:id | Delete an inquiry (admin) |

---

## 👨‍💻 Developer

**Krishna Kumar**  
Full-Stack MERN Developer  
[GitHub](https://github.com/KrishnaKr01) | [LinkedIn](https://linkedin.com/in/krishnakumar024)
