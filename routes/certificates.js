const express = require("express");
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

    const temp = {name: 'try'};

    await page.setContent(jsTemplate(req.body));
    await page.emulateMedia('screen');
    res.send(
      await page.pdf({
        path: 'try.pdf',
        format: "A4",
        landscape: true,
        printBackground: true
      }));
  } catch (e) {
    console.error(e);
  }
});

router.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/try.pdf`)
})




module.exports = router;