const express = require("express");
const router = express.Router();



// Dashboard Panel
router.get("/", (req, res) => {
  try {
    res.render('dashboard/dashboard', {
      title: "لوحة التحكم"
    });
  } catch {
    res.redirect('/');
  }
});
// Dashboard Panel
router.get("/d", (req, res) => {
  try {
    res.render('dashboard/dashboard', {
      title: "لوحة التحكم"
    });
  } catch {
    res.redirect('/');
  }
});
module.exports = router;