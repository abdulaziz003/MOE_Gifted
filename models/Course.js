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
  publishedAt: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
},{timestamps: true});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;