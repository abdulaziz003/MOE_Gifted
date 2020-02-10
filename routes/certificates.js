const express = require("express");
const router = express.Router();


// certificate Panel
router.get("/", (req, res) => {
  res.render("certificates/index", {
    title: "الصفحة الرئيسية | الشهادات"
  });
});
module.exports = router;