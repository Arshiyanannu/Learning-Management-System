const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
 
// Load environment variables from .env file
dotenv.config();
 
// Connect to MongoDB
connectDB();
 
// Initialize Express app
const app = express();
 
// ------------------- Middleware -------------------
app.use(cors()); // Allow requests from frontend (React app)
app.use(express.json()); // Parse incoming JSON request bodies
 
// ------------------- Routes -------------------
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
 
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
 
// Simple health check route (useful to confirm server is running)
app.get('/', (req, res) => {
  res.send('LMS Backend API is running...');
});
 
// ------------------- Error Handling -------------------
// Catch-all for routes that don't exist
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
 
// Generic error handler (catches errors passed via next(err))
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});
 
// ------------------- Start Server -------------------
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
