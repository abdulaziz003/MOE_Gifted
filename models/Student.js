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
    name:{
      type:String
    },
    studentMark: {
      type: Number
    },
    isTaken: {
      type: Boolean,
      default: false
    },
    examDate:{
      type: String
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