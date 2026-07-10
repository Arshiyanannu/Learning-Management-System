# EduLMS - Full-Stack Learning Management System Engine

EduLMS is a production-ready, modular Learning Management System (LMS) built on the MERN stack. The platform features an adaptive, open course catalog framework designed to handle administrative management layouts and student learning progress tracking interfaces seamlessly.

---

## 🏛️ Application Architecture Overview

The system is split into two cleanly decoupled root modules designed to run simultaneously across distinct local network ports:

* **`client/`**: A React single-page web view application structured with custom navigation trees, lifecycle loading state safeguards, and dynamic context-driven role layout gating.
* **`server/`**: A robust RESTful Node.js and Express API service engine configured with automated Mongoose data indexing, bcrypt credential encryption hooks, and JSON Web Token (JWT) session generation protocols.

---

## 🚀 Step-by-Step Installation & Local Deployment Guide

Follow these sequential steps to establish dependency environments, prepare local configurations, seed test data metrics, and boot the application engine.

### Prerequisites
Ensure you have downloaded and initialized the following environment stacks on your machine:
* [Node.js (v18+ Recommended)](https://nodejs.org/)
* [MongoDB Community Server & MongoDB Compass](https://www.mongodb.com/try/download/community)

---

### Step 1: Initialize Database Connectivity Configurations
Navigate into your backend root folder:
```bash
cd server

Create a new file named exactly .env directly inside the server/ directory. Open it and declare your system gateway variables matching this blueprint:

Ini, TOML
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/edulms
JWT_SECRET=your_secret_assignment_key_2026_lms
JWT_EXPIRES_IN=7d
Note: Reference the provided blueprint guide inside .env.example to review required production variable names without exposing live system execution keys.

Step 2: Establish Backend Dependencies & Seed Sample Datasets
While still inside the server/ directory, run the clean package installation step to build your local node_modules structure:

Bash
npm install
Once packages finish downloading, run the specialized database seed helper utility script once. This connects directly to your active local MongoDB instance, drops existing records to avoid compilation duplicates, generates a default supervisor/instructor profile matrix, and inserts baseline sample courses:

Bash
node seed.js
Seeded Credentials For Project Evaluation:

Role Type: System Administrator / Course Instructor

Email: instructor@edulms.com

Password: password123

Step 3: Establish Frontend Client Dependencies
Open a second, separate command terminal window alongside your backend terminal interface, and navigate into your React user interface workspace folder:

Bash
cd client
Execute the local package assembly command string to download mandatory view routing engines and component icon bundles:

Bash
npm install
Step 4: Boot the Runtime Engines
To run and test the complete application network, ensure both server loops remain executing simultaneously across your terminal layouts.

In your Backend Terminal (server/ folder):

Bash
npm run dev
The terminal window will print confirmation logs indicating Server running on port 5000 and MongoDB Connected: 127.0.0.1.

In your Frontend Terminal (client/ folder):

Bash
npm run dev
The terminal interface will output a local browser network address link (typically http://localhost:5173). Click the address to initialize your evaluation view testing!

🛠️ Main Features & API Endpoint Routing Schemes
Authentication Routing Paths (/api/auth)
POST /api/auth/register — Registers a student or instructor user account directly to MongoDB while applying automated pre-save password encryption hashing.

POST /api/auth/login — Evaluates data model records, cross-checks custom user compare methods, and returns a session-signed JWT cookie token.

GET /api/auth/me — Private profile access path parsing client tokens to load user detail configurations safely.

Curriculum Management Routing Paths (/api/courses)
GET /api/courses — Public registry browsing module mapping available educational course tracks.

POST /api/courses — Private structural route restricted to Admin tokens to initialize empty metadata blueprints or attach rich sub-schema module lesson arrays.

DELETE /api/courses/:id — Purges targeted course records out of database schema indices cleanly.

Progress and Enrollment Tracks (/api/enrollments)
POST /api/enrollments — Student restricted route enabling open course tracking registrations.

GET /api/enrollments/my — Pulls live individual enrollment states and populates detailed data grids.

👥 Contributor Architecture
Developed as a core engineering capability showcase piece for full-stack portfolio evaluation metrics.