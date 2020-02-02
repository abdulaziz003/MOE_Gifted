const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  NationalID: {
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
  school: {
    type: String,
    required: true
  },
  exams: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Exam'
  }],
  courses: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;