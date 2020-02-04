const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nationalID: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  exams: [{
    exam:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    studentMark: {
      type: Number
    },
    takenAt: {
      type: Date
    }
  }],
  courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;