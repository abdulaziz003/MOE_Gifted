const express = require("express");
const router = express.Router();


const Student = require('../models/Student');
const Exam = require('../models/Exam');

// Dashboard Panel
router.get("/", async(req, res) => {
  const exams = await Exam.find({});
  const students = await Student.find({});

  res.render("register/index", {
    title: "تسجيل الطلاب باختبارات",
    exams: exams,
    students: students
  });
});
router.post("/", async(req, res) => {
  const examObj = {
    exam: req.body.exam,
    studentMark: 80,
    takenAt: Date.now()
  }
  const studentsIds = req.body.students;
  const examId = req.body.exam;
  studentsIds.forEach(async function(studentId){
      try{
        const student = await Student.findById(studentId);
        student.exams.push(examObj);
        await student.save();
        const exam = await Exam.findById(examId);
        exam.students.push(studentId);
        await exam.save();
      }catch(err){
        console.log(err)
        res.redirect('/register');
      }
    });
    res.render('register/show', { title: 'الطلاب المسجلين' });
});
module.exports = router;