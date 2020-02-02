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

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;