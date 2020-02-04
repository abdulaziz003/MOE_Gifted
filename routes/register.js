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
  
  const examId = req.body.exam;
  if(Array.isArray(req.body.students)){
    const studentsIds = req.body.students;
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
  }else{
    try {
      const student = await Student.findById(req.body.students);
      student.exams.push(examObj);
      const exam = await Exam.findById(examId);
      exam.students.push(req.body.students);
      await student.save();
      await exam.save();
      res.render('register/show', { title: 'الطلاب المسجلين' });
    } catch (err) {
      console.log(err)
      res.redirect('/register');
    }
  }
});
module.exports = router;