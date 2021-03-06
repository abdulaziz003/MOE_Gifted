const express = require('express');
const router = express.Router();
const momentHijri = require('moment-hijri');

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
    res.render('examinations/index', {
      title: 'جميع الاختبارات',
      exams: exams,
      momentHijri: momentHijri,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

// POST - Create new Exam function Router
router.post('/', async (req, res) => {
  momentHijri.locale("en");
  // Convert from Hijri to Gregorian
  let gregorianDate = momentHijri(req.body.publishedAt, "iYYYY/iM/iD").format(
    "YYYY-M-D"
  ); // 2014-11-28
  const exam = new Exam({
    name: req.body.name,
    totalMark: Number.parseInt(req.body.totalMark),
    publishedAt: gregorianDate
  });
  try {
    const newExam = await exam.save();
    res.redirect(`examinations/${newExam.id}`);
  } catch {
    res.render('examinations/new', {
      title: 'اختبار جديد',
      exam: exam,
      errorMessage: 'error creating Exam'
    })
  }
});

// Display Create new Exam Form Route
router.get('/new', (req, res) => {
  const exam = new Exam();
  res.render('examinations/new', { 
    title: 'اختبار جديدة',
    exam: exam,
    momentHijri: momentHijri
     });
});


// Show Exam
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    res.render('examinations/show', {
      title: 'عرض بيانات اختبار',
      exam: exam,
      user: null,
      momentHijri: momentHijri
    });

  } catch{
    res.redirect('/examinations');
  }
});


// Edit Exam
router.get('/:id/edit', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    res.render('examinations/edit', { title: 'تعديل بيانات اختبار', exam: exam });
  } catch{
    res.redirect('/examinations');
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
    res.redirect(`/examinations/${exam.id}`);
  } catch {
    if (exam == null) {
      res.redirect('/examinations');
    } else {
      res.render('examinations/edit', {
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
    res.redirect(`/examinations`);
  } catch {
    if (exam == null) {
      res.redirect('/examinations');
    } else {
      res.redirect(`/examinations/${course.id}`);
    }
  }
});

module.exports = router;