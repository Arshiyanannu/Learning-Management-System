const Course = require('../models/Course');
 
// @desc    Get all courses (public - anyone can browse)
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    // populate() replaces the instructor ObjectId with actual user info (name, email)
    const courses = await Course.find().populate('instructor', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching courses' });
  }
};
 
// @desc    Get a single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
 
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
 
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectId format gracefully
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
    res.status(500).json({ message: 'Server error while fetching course' });
  }
};
 
// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Admin only)
const createCourse = async (req, res) => {
  try {
    const { title, description, lessons } = req.body;
 
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
 
    const course = await Course.create({
      title,
      description,
      instructor: req.user._id, // comes from authMiddleware
      lessons: lessons || [], // optional at creation time
    });
 
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating course' });
  }
};
 
// @desc    Update an existing course
// @route   PUT /api/courses/:id
// @access  Private (Admin only)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
 
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
 
    // Optional: only allow the instructor who created it to edit it
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this course' });
    }
 
    const { title, description, lessons } = req.body;
 
    course.title = title || course.title;
    course.description = description || course.description;
    course.lessons = lessons || course.lessons;
 
    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating course' });
  }
};
 
// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private (Admin only)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
 
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
 
    // Optional: only allow the instructor who created it to delete it
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this course' });
    }
 
    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting course' });
  }
};
 
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};