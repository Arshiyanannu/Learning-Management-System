const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
 
// @desc    Enroll the logged-in student in a course
// @route   POST /api/enrollments
// @access  Private (Student only)
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
 
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }
 
    // Check if the course actually exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
 
    // Check if the student is already enrolled in this course
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });
 
    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }
 
    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
      completedLessons: [],
    });
 
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while enrolling in course' });
  }
};
 
// @desc    Get all courses the logged-in student is enrolled in
// @route   GET /api/enrollments/my
// @access  Private (Student only)
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate({
      path: 'course',
      select: 'title description lessons instructor',
      populate: { path: 'instructor', select: 'name email' },
    });
 
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching your enrollments' });
  }
};
 
// @desc    Mark a lesson as complete for the logged-in student
// @route   PUT /api/enrollments/:id/progress
// @access  Private (Student only)
const updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);
 
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
 
    // Make sure the enrollment belongs to the logged-in student
    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this enrollment' });
    }
 
    if (!lessonId) {
      return res.status(400).json({ message: 'Lesson ID is required' });
    }
 
    // Avoid adding duplicate lesson IDs to the completedLessons array
    const alreadyCompleted = enrollment.completedLessons.some(
      (id) => id.toString() === lessonId
    );
 
    if (!alreadyCompleted) {
      enrollment.completedLessons.push(lessonId);
      await enrollment.save();
    }
 
    res.status(200).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating progress' });
  }
};
 
// @desc    Get all students enrolled in a specific course (for Admin view)
// @route   GET /api/enrollments/course/:courseId
// @access  Private (Admin only)
const getStudentsForCourse = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId }).populate(
      'student',
      'name email'
    );
 
    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching enrolled students' });
  }
};
 
module.exports = {
  enrollInCourse,
  getMyEnrollments,
  updateProgress,
  getStudentsForCourse,
};