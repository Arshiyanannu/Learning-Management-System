# 🎓 Learning Management System (LMS)

A full-stack Learning Management System (LMS) developed using the MERN Stack. The application provides a platform for administrators to manage courses and enables students to browse, enroll, and access course information through a secure and responsive web interface.

---

## 📌 Project Status

🚧 This project is currently under active development as part of a college MERN Stack project. Additional features and UI improvements are being implemented.

---

## 🚀 Features

### 👨‍🎓 Student Module
- User Registration and Login
- Secure JWT Authentication
- Browse Available Courses
- View Course Details
- Enroll in Courses
- Student Dashboard
- User Profile

### 👨‍🏫 Admin Module
- Secure Admin Login
- Create New Courses
- Edit Existing Courses
- Delete Courses
- Manage Course Content
- Admin Dashboard

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

## 📁 Project Structure

```text
Learning-Management-System
│
├── client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Arshiyanannu/Learning-Management-System.git
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/edulms
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal.

```bash
cd client
npm install
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🌱 Sample Data

Run the database seed script to populate the database with sample users and courses.

```bash
cd server
node seed.js
```

This will generate default administrator credentials for testing. Refer to the `seed.js` file for the generated account details.

---

## 📸 Screenshots

Project screenshots will be added after the final UI redesign.

---

## 🌟 Future Enhancements

- Course Progress Tracking
- Video Lessons
- Quiz Module
- Certificate Generation
- Email Notifications
- Dark Mode
- Course Search & Filtering
- Progress Analytics

---

## 👥 Team

This project was developed collaboratively as part of a college MERN Stack project.

**Team Members**

- Arshiya Shaik Nannu
- Kolluri Sai Sravani
- Vadla RamyaSri
- Pavani

---

## 📄 License

This project is developed for educational purposes only.