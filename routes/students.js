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
    student.exam_level_1 = {
      name: req.body.level_1_name,
      studentMark: req.body.level_1_mark,
      isTaken: true,
      examDate: req.body.level_1_year
    }
  }

  if(req.body.isExam2Checked){
    student.exam_level_2 = {
      name: req.body.level_2_name,
      studentMark: req.body.level_2_mark,
      isTaken: true,
      examDate: req.body.level_2_year
    }

  }

  if(req.body.isExam3Checked){
    student.exam_level_3 = {
      name: req.body.level_3_name,
      studentMark: req.body.level_3_mark,
      isTaken: true,
      examDate: req.body.level_3_year
    }

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
    res.render('students/show', {
      title: 'عرض بيانات طالب',
      student: student,
      momentHijri: momentHijri,
      user: null,
      enrolledCourses: courses
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
    res.render('students/edit', { 
      title: 'تعديل بيانات طالب',
       student: student,
        momentHijri: momentHijri,
        user: null
      });
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
    student.updatedAt = Date.now();
    student.nationalID = req.body.nationalID;
    if(req.body.isActive){
      student.isActive = true;
    }else {
      student.isActive = false;
    }
    console.log(req.body.isExam1Checked, !req.body.isExam1Checked);
    console.log(req.body.isExam2Checked);
    console.log(req.body.isExam3Checked);

    if (!req.body.isExam1Checked){
      console.log('don')
      student.exam_level_1 = {isTaken:false}
    } else{
      student.exam_level_1 = {
        name: req.body.level_1_name,
        studentMark: req.body.level_1_mark,
        isTaken: true,
        examDate: req.body.level_1_year
      }
    }
    
    
    if (!req.body.isExam2Checked){
      student.exam_level_2 = {isTaken:false};
    } else{
      student.exam_level_2 = {
        name: req.body.level_2_name,
        studentMark: req.body.level_2_mark,
        isTaken: true,
        examDate: req.body.level_2_year
      }
    }

    
    if (!req.body.isExam3Checked){
      student.exam_level_3 = {isTaken:false}
    } else {
      student.exam_level_3 = {
        name: req.body.level_3_name,
        studentMark: req.body.level_3_mark,
        isTaken: true,
        examDate: req.body.level_3_year
      }
    }


    await student.save();
    res.redirect(`/students/${student.id}/edit`);
  } catch(err) {
    console.log(err)
    if (student == null) {
      res.redirect('students');
    } else {
      res.render('students/edit', {
        title: 'تعديل بيانات طالب',
        student: student,
        user: null,
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

// TODO: DELETE THIS ROUTE
// Delete Student exam
router.delete('/:id/delete_exam/:examId', async (req, res) => {
  let student;
  const examId = req.params.examId;
  console.log('deleting student exam');
  try {
    student = await Student.findById(req.params.id);
    const newExams = arrayRemoveElement(student.exams, examId);
    student.exams = newExams;
    await student.save();
    res.redirect(`/students/<%=student.id%>/edit`);
  } catch {
    if (student == null) {
      res.redirect('/students');
    } else {
      res.redirect(`/students/${student.id}`);
    }
  }
});

// remove element from array
function arrayRemoveElement(array, value) {

  return array.filter(function (ele) {
    return ele.id != value;
  });

}



module.exports = router;