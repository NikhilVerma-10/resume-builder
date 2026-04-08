# AI Resume Builder (Full Stack MERN)

A comprehensive, full-stack web application that empowers users to seamlessly create, manage, and share professional resumes. Built with the MERN stack and enhanced with AI capabilities, this platform simplifies the resume-building process with interactive forms, image optimization, and real-time live link sharing.

## 🚀 Overview

The **AI Resume Builder** provides a complete ecosystem for professionals to craft their digital portfolios. It features a secure authentication system, a personalized dashboard for managing multiple resumes, and an intelligent builder interface. Users can start from scratch or upload an existing resume to be enhanced by AI, all wrapped in a highly responsive, modern UI.

## ✨ Key Features

* **Secure Authentication:** Full signup and login flows with session management.
* **Smart Dashboard:** A centralized hub to view, edit, and manage multiple resumes.
* **AI-Enhanced Generation:** Automatically enhance existing resumes or generate content tailored to specific professions using AI integrations.
* **Advanced Media Handling:** Integrated with ImageKit for seamless user profile image uploads, including background removal capabilities.
* **Live Sharing:** Generate unique, live URLs for each resume to share instantly with recruiters or clients.
* **Responsive Landing Page:** A polished frontend featuring a hero section, feature breakdowns, and user testimonials.

## 💻 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Lucide React (Icons)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Media Management:** ImageKit.io
* **Deployment & Infrastructure:** Hostinger VPS, Nginx, Certbot (SSL/HTTPS)

## 📂 Project Structure

The project follows a standard decoupled Client/Server architecture:


AI_Resume_Builder/
│
├── client/                 # React Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Testimonials, Title)
│   │   ├── pages/          # Full page views (Home, Dashboard, Login, Builder)
│   │   ├── index.css       # Tailwind CSS configuration
│   │   └── App.jsx         # Main React router and layout
│   ├── .env                # Frontend environment variables (API URLs)
│   └── package.json
│
└── server/                 # Node/Express Backend application
    ├── controllers/        # Business logic for auth and resumes
    ├── models/             # Mongoose database schemas
    ├── routes/             # API endpoint definitions
    ├── .env                # Backend secrets and DB URI
    └── index.js            # Main server entry point

## 🚦 Getting Started
Prerequisites
Node.js installed on your machine

A MongoDB cluster/local instance

An ImageKit.io account for media processing

Local Development Setup

Clone the repository:
git clone [https://github.com/YourUsername/AI_Resume_Builder.git](https://github.com/YourUsername/AI_Resume_Builder.git)

cd AI_Resume_Builder

Backend Setup:
cd server
npm install
# Create a .env file and add your MongoDB URI and JWT secrets
npm run server

Frontend Setup:
cd ../client
npm install
# Create a .env file and add your local API URL (http://localhost:3000)
npm run dev

Access the App: Open http://localhost:5173 (or the port Vite provides) in your browser.
