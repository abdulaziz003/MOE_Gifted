const express = require('express');
const router = express.Router();

let momentHijri = require("moment-hijri");

// Import Student model to create new Student
const Student = require('../models/Student');
const Course = require('../models/Course');
const Exam = require('../models/Exam');

// Get all Students Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');// i means not case sensitive 
  }
  try {
    const students = await Student.find(searchOptions);
    res.render('students/index', {
      title: 'جميع الطلاب',
      student: new Student(),
      students: students,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

// POST - Create new Student function Router
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    nationalID: req.body.nationalID,
    school: req.body.school,
  });

  if(req.body.isExam1Checked){
    const exam1 = {
      name: req.body.level_1_name,
      studentMark: req.body.level_1_mark,
      isTaken: true,
      examDate: req.body.level_1_year
    }
    student.exams.push(exam1);
  }

  if(req.body.isExam2Checked){
    const exam2 = {
      name: req.body.level_2_name,
      studentMark: req.body.level_2_mark,
      isTaken: true,
      examDate: req.body.level_2_year
    }
    student.exams.push(exam2);
  }

  if(req.body.isExam3Checked){
    const exam3 = {
      name: req.body.level_3_name,
      studentMark: req.body.level_3_mark,
      isTaken: true,
      examDate: req.body.level_3_year
    }
    student.exams.push(exam3);
  }
  try {
    await student.save();
    res.redirect('/students');
  } catch(err) {
    console.log(err);
    res.render('students/new', {
      title: 'طالب جديد',
      student: student,
      errorMessage: 'error creating Student'
    })
  }
});

// Display Create new Student Form Route
router.get('/new', async (req, res) => {
  const courses = await Course.find({});
  res.render('students/new', { 
    title: 'طالب جديد',
    student: new Student(),
    courses: courses,
    momentHijri: momentHijri
  });
});


// Show Student
router.get('/:id', async (req, res) => {
  const studentId = req.params.id
  try {
    const student = await Student.findById(req.params.id);
    const courses = await Student.findById(req.params.id);
    // const exams = await Exam.find({students: studentId});
    const exams = await Exam.students.id(req.params.id);
    console.log(exams) //TODO
    res.render('students/show', {
      title: 'عرض بيانات طالب',
      student: student,
      momentHijri: momentHijri,
      user: null,
      enrolledCourses: courses,
      takenExams: exams
    });

  } catch(err){
    console.log(err);
    res.redirect('/students');
  }
});


// Edit Student
router.get('/:id/edit', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render('students/edit', { title: 'تعديل بيانات طالب', student: student });
  } catch{
    res.redirect('/students');
  }
});

// Update Student
router.put('/:id', async (req, res) => {
  let student;
  try {
    student = await Student.findById(req.params.id);
    student.name = req.body.name;
    student.school = req.body.school;
    student.nationalID = req.body.nationalID;
    student.updatedAt = Date.now();
    student.isActive = req.body.isActive;

    await student.save();
    res.redirect(`/students/${student.id}`);
  } catch {
    if (student == null) {
      res.redirect('students');
    } else {
      res.render('students/edit', {
        title: 'تعديل بيانات طالب',
        student: student,
        errorMessage: 'error updating an Student'
      })
    }
  }
});

// Delete Student
router.delete('/:id', async (req, res) => {
  let student;
  try {
    student = await Student.findById(req.params.id);
    await student.remove();
    res.redirect(`/students`);
  } catch {
    if (student == null) {
      res.redirect('/students');
    } else {
      res.redirect(`/students/${student.id}`);
    }
  }
});

module.exports = router;