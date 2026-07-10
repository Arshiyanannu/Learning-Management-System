const mongoose = require('mongoose');

// Lesson Sub Schema
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Lesson title is required"],
    trim: true
  },
  content: {
    type: String,
    required: [true, "Lesson content is required"]
  }
});

// Course Schema
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Course description is required"]
    },
    image: {
      type: String,
      default: "" // REMOVED REQUIRED: Makes it optional so empty strings pass cleanly!
    },
    category: {
      type: String,
      required: [true, "Course category is required"]
    },
    price: {
      type: Number,
      required: [true, "Course price is required"]
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"]
    },
    level: {
      type: String,
      required: [true, "Course level is required"],
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced"
      ]
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    lessons: [
      lessonSchema
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);