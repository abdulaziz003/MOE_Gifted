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
    school: req.body.school
  });
  try {
    const newStudent = await student.save();
    console.log(req.body.quickAdd);
    if(req.body.quickAdd == true){
      res.redirect('/students');
    }else{
      res.redirect(`students/${newStudent.id}`);
    }
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
  const exams = await Exam.find({});
  const courses = await Course.find({});
  res.render('students/new', { 
    title: 'طالب جديد',
    student: new Student(),
    exams: exams,
    courses: courses
  });
});


// Show Student
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const courses = await Student.findById(req.params.id).populate('courses').exec();
    const exams = await Student.findById(req.params.id).populate('exams').exec();
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
    // student.exams.push() // TODO deleting and adding exams and courses

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