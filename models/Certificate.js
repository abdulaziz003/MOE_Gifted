const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  printed_count:{
    type: Number,
    default: 0
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
}, { timestamps: true });


const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = Certificate;