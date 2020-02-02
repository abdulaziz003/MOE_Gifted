const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;