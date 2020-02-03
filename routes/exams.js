const express = require('express');
const router = express.Router();

// Import Exam model to create new Exam
const Exam = require('../models/Exam');

// Get all Exams Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');// i means not case sensitive 
  }
  try {
    const exams = await Exam.find(searchOptions);
    res.render('exams/index', {
      title: 'جميع الاختبارات',
      exams: exams,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

// POST - Create new Exam function Router
router.post('/', async (req, res) => {
  const exam = new Exam({
    name: req.body.name,
    totalMark: req.body.totalMark,
    publishedAt: req.body.publishedAt,
    isActive: req.body.isActive,
    isPublished: req.body.isPublished
  });
  try {
    const newExam = await exam.save();
    res.redirect(`exams/${newExam.id}`);
  } catch {
    res.render('exams/new', {
      title: 'اختبار جديد',
      exam: exam,
      errorMessage: 'error creating Exam'
    })
  }
});

// Display Create new Exam Form Route
router.get('/new', (req, res) => {
  res.render('Exam/new', { title: 'اختبار جديدة', exam: new Exam() });
});


// Show Exam
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    res.render('exams/show', {
      title: 'عرض بيانات دورة',
      exam: exam
    });

  } catch{
    res.redirect('/exams');
  }
});


// Edit Exam
router.get('/:id/edit', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    res.render('exams/edit', { title: 'تعديل بيانات اختبار', exam: exam });
  } catch{
    res.redirect('/exams');
  }
});

// Update Exam
router.put('/:id', async (req, res) => {
  let exam;
  try {
    exam = await Exam.findById(req.params.id);
    exam.name = req.body.name;
    exam.duration = req.body.duration;
    exam.updatedAt = Date.now();
    exam.isActive = req.body.isActive;
    // student.exams.push() // TODO deleting and adding exams and exams

    await exam.save();
    res.redirect(`/exams/${exam.id}`);
  } catch {
    if (exam == null) {
      res.redirect('exams');
    } else {
      res.render('exams/edit', {
        title: 'تعديل بيانات اختبار',
        exam: exam,
        errorMessage: 'error updating an Exam'
      })
    }
  }
});

// Delete Exam
router.delete('/:id', async (req, res) => {
  let exam;
  try {
    exam = await Exam.findById(req.params.id);
    await exam.remove();
    res.redirect(`/exams`);
  } catch {
    if (exam == null) {
      res.redirect('/exams');
    } else {
      res.redirect(`/exams/${course.id}`);
    }
  }
});

module.exports = router;