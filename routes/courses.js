const express = require('express');
const router = express.Router();

let momentHijri = require("moment-hijri");

// Import Course model to create new Course
const Course = require('../models/Course');
const Student = require('../models/Student');

// Get all Courses Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');// i means not case sensitive 
  }
  try {
    const courses = await Course.find(searchOptions);
    res.render('courses/index', {
      title: 'جميع الدورات',
      courses: courses,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

// POST - Create new Course function Router
router.post('/', async (req, res) => {
  const course = new Course({
    name: req.body.name,
    duration: req.body.duration,
    publishedAt: req.body.publishedAt
  });
  try {
    const newCourse = await course.save();
    res.redirect(`courses/${newCourse.id}`);
  } catch {
    res.render('courses/new', {
      title: 'دورة جديدة',
      course: course,
      errorMessage: 'error creating Course'
    })
  }
});

// Display Create new Course Form Route
router.get('/new', (req, res) => {
  res.render('courses/new', { title: 'دورة جديدة', course: new Course() });
});


// Show Course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render('courses/show', {
      title: 'عرض بيانات دورة',
      course: course,
      momentHijri: momentHijri,
      user: null
    });

  } catch{
    res.redirect('/courses');
  }
});

// Show adding students to Course
router.get('/:id/register', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const students = await Student.find({});
    res.render('courses/register', {
      title: 'تسجيل طلاب بالدورة',
      course: course,
      students: students,
      momentHijri: momentHijri
    });
  } catch{
    res.redirect('/courses');
  }
});

// Show adding students to Course
router.post('/:id/register', async (req, res) => {
  let course;
  let student;
  const studentsList = req.body.studentInCourse;
  console.log(studentsList);
  console.log(Array.isArray(studentsList));
  let isAnArray = Array.isArray(studentsList);
  try {
    if(isAnArray){
      course = await Course.findById(req.params.id);
      studentsList.forEach(async studentId =>{
        course.students.push(studentId);
        student = await Student.findById(studentId);
        student.courses.push(course.id);
        await student.save();
      });
      await course.save();
    } else {
      course = await Course.findById(req.params.id);
      course.students.push(studentsList);
      student = await Student.findById(studentsList);
      student.courses.push(course.id);
      await student.save();
      await course.save();
    }
    res.redirect(`/courses/${course.id}/register`);
  } catch(err){
    console.log(err);
    res.redirect('/courses');
  }
});

// Show adding students to Course
router.get('/:id/register', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render('courses/register', {
      title: 'تسجيل طلاب بالدورة',
      course: course,
      momentHijri: momentHijri
    });
  } catch{
    res.redirect('/courses');
  }
});


// Edit Course
router.get('/:id/edit', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render('courses/edit', { 
      title: 'تعديل بيانات دورة',
      course: course,
      momentHijri: momentHijri,
      user: null 
    });
  } catch{
    res.redirect('/courses');
  }
});

// Update Course
router.put('/:id', async (req, res) => {
  let course;
  try {
    course = await Course.findById(req.params.id);
    course.name = req.body.name;
    course.duration = req.body.duration;
    course.publishedAt = req.body.publishedAt;
    course.updatedAt = Date.now();
    if(req.body.isActiveToggle){
      course.isActive = true;
    }else{
      course.isActive = false;
    }
    await course.save();
    res.redirect(`/courses/${course.id}/edit`);
  } catch {
    if (course == null) {
      res.redirect('courses');
    } else {
      res.render('courses/edit', {
        title: 'تعديل بيانات دورة',
        course: course,
        user: null,
        momentHijri: momentHijri,
        errorMessage: 'error updating an Course'
      })
    }
  }
});

// Delete Course
router.delete('/:id', async (req, res) => {
  let course;
  try {
    course = await Course.findById(req.params.id);
    await course.remove();
    res.redirect(`/courses`);
  } catch {
    if (course == null) {
      res.redirect('/courses');
    } else {
      res.redirect(`/courses/${course.id}`);
    }
  }
});

module.exports = router;