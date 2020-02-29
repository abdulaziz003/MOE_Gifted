const express = require("express");
const path = require('path');
const router = express.Router();
const puppeteer = require('puppeteer');



// certificate Panel
router.get("/", (req, res) => {
  res.render("certificates/index", {
    title: "الصفحة الرئيسية | الشهادات"
  });
});


router.post('/create-pdf', async (req, res) => {
  const jsTemplate = require('../templates/A4page');
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(req.body);
    await page.setContent(jsTemplate(req.body));
    await page.emulateMedia('screen');
    await page.pdf({
      path: `./students_certificates/try.pdf`,
      format: "A4",
      landscape: true,
      printBackground: true
    });
    // res.redirect('/certificates/fetch-pdf');
    // res.sendFile(path.join(__dirname, '../students_certificates/try.pdf'));
    res.download(path.join(__dirname, '../students_certificates/try.pdf'))
  } catch (e) {
    console.error(e);
  }
});

router.get('/fetch-pdf', (req, res) => {
  res.sendFile(path.join(__dirname,'../students_certificates/try.pdf'))
})




module.exports = router;