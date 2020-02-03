const express = require('express');
const router = express.Router();

// Import Course model to create new Course
const Course = require('../models/Course');

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
    publishedAt: req.body.publishedAt,
    isActive: req.body.isActive
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
      course: course
    });

  } catch{
    res.redirect('/courses');
  }
});


// Edit Course
router.get('/:id/edit', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render('courses/edit', { title: 'تعديل بيانات دورة', course: course });
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
    course.updatedAt = Date.now();
    course.isActive = req.body.isActive;
    // student.exams.push() // TODO deleting and adding exams and courses

    await course.save();
    res.redirect(`/courses/${course.id}`);
  } catch {
    if (course == null) {
      res.redirect('courses');
    } else {
      res.render('courses/edit', {
        title: 'تعديل بيانات دورة',
        course: course,
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