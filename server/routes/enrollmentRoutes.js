const express = require('express');
const router = express.Router();
 
const {
  enrollInCourse,
  getMyEnrollments,
  updateProgress,
  getStudentsForCourse,
} = require('../controllers/enrollmentController');
 
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
 
// @route   POST /api/enrollments
// @desc    Enroll the logged-in student in a course
router.post('/', protect, authorizeRoles('student'), enrollInCourse);
 
// @route   GET /api/enrollments/my
// @desc    Get all courses the logged-in student is enrolled in
router.get('/my', protect, authorizeRoles('student'), getMyEnrollments);
 
// @route   PUT /api/enrollments/:id/progress
// @desc    Mark a lesson as complete for the logged-in student
router.put('/:id/progress', protect, authorizeRoles('student'), updateProgress);
 
// @route   GET /api/enrollments/course/:courseId
// @desc    Get all students enrolled in a specific course (admin only)
router.get('/course/:courseId', protect, authorizeRoles('admin'), getStudentsForCourse);
 
module.exports = router;
