const express = require("express");
const router = express.Router();


// Dashboard Panel
router.get("/", (req, res) => {
  res.render("index", {
    title: "الصفحة الرئيسية"
  });
});
module.exports = router;