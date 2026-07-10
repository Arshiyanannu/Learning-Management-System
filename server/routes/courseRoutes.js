const express = require('express');
const router = express.Router();
 
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
 
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
 
// @route   GET /api/courses
// @desc    Get all courses (public, anyone can browse)
router.get('/', getAllCourses);
 
// @route   GET /api/courses/:id
// @desc    Get a single course by ID (public)
router.get('/:id', getCourseById);
 
// @route   POST /api/courses
// @desc    Create a new course (admin only)
router.post('/', protect, authorizeRoles('admin'), createCourse);
 
// @route   PUT /api/courses/:id
// @desc    Update a course (admin only)
router.put('/:id', protect, authorizeRoles('admin'), updateCourse);
 
// @route   DELETE /api/courses/:id
// @desc    Delete a course (admin only)
router.delete('/:id', protect, authorizeRoles('admin'), deleteCourse);
 
module.exports = router;