const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  totalMark: {
    type: Number,
    required: true
  },
  publishedAt: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished:{
    type: Boolean,
    default: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
},{timestamps: true});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;