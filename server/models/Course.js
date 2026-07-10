const mongoose = require('mongoose');
 
// Sub-schema for individual lessons inside a course
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Lesson content is required'],
  },
});
 
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // references the admin who created the course
      required: true,
    },
    lessons: [lessonSchema], // embedded array of lessons
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model('Course', courseSchema);