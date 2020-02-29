module.exports = ({ studentName, studentSchool, courseName, courseDuration, courseLocation }) => {
    const today = new Date();
    return `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <style>
        @import url("https://fonts.googleapis.com/css?family=Amiri|Changa");
        @import url('https://fonts.googleapis.com/css?family=Almarai&display=swap');

        body {
        /* font-family: "Changa", sans-serif; */
          font-family: "Almarai", sans-serif;
          height: 100%;
        }
        .ksa-info p {
          padding:2px;
          font-size: 18px;
          margin:0 4px;
          text-align: center;
        }

        .grid-header img {
          padding: 5px;
          width:70%;
        }


        .grid-main {
          grid-area: 'main';
          font-size: 28px;
        }

        .grid-main div {
          padding: 4px 2px;
        }

        .start-content {
          text-align: center;
        }
        .end-content {
          text-align: center;
        }
        .student-name {
          text-align: center;
        }
        .school-name {
          text-align: center;
        }

        .grid-title {
          grid-area: 'title';
        }
        .grid-program-info {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          margin: 100px;
          margin-bottom: 50px;
          font-size: 20px;
          grid-gap: 4px;
          grid-area: 'info';
          border:1px solid #333;
          padding:4px;
        }
        .grid-program-info div {
          border:1px solid #333;
          text-align: center;
          padding: 6px;
        }

        .grid-header {
          grid-area: 'header';
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }


        .manger {
          text-align: center;
        }

        .sign {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 170px;
          justify-items: center;
          align-items: center;
        }


        .grid {
          display: grid;
          grid:
            'header'
            'title'
            'info'
            'main';
        }



        .container {
          height: 200mm;
          width: 290mm;
          background: url('https://www.themezaa.com/html/pofo/images/pofo-magic-box-bg.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          background-color: #ddd;
          border: 4px solid #333;
          border-radius: 8px;
        }

        .title {
          text-align: center;
          font-size: 2em;
          font-weight: bold;
        }
        </style>
        <title>Document</title>
      </head>

      <body>
        <div class="container">
          <div class="grid">
            <div class="grid-header">
              <div class="logo1">
                <img src="https://www.moe.gov.sa/en/MediaCenter/MinistryLogo/PublishingImages/Pages/default/MOELogo.png" alt="">
              </div>
              <div class="logo2"></div>
              <div class="logo3"></div>
              <div class="ksa">
                <div class="ksa-info">
                  <p class="sa">المملكة العربية السعودية</p>
                  <p class="moe">وزارة التعليم</p>
                  <p class="office">الادارة العامة للتعليم بالمخواة</p>
                  <p class="gifted">ادارة الموهوبين</p>
                </div>
              </div>
            </div>
            <div class="grid-title">
              <div class="title">شهادة برنامج اثرائي</div>
            </div>
            <div class="grid-program-info">
              <div class="program-name">المكان</div>
              <div class="program-date">مدته</div>
              <div class="program-hours">اسم البرنامج</div>
              <div>${courseLocation}</div>
              <div>${courseDuration}</div>
              <div>${courseName}</div>
            </div>
            <div class="grid-main">
              <div class="start-content">تشهد الادارة االعامة للتعليم بالباحة ادارة الموهوبين بأن</div>
              <div class="student-name">الطالب/${studentName}</div>
              <div class="school-name">مدرسته /${studentSchool}</div>
              <div class="end-content">قد اتم البرنامج الاثرائي الموضحة بياناته أعلاه متمنين له مزيداً من التقدم والنجاح</div>
            </div>
            <div class="sign">
              <div class="manger">
                <p>مدير عام التعليم بالمخواة</p>
                <p>name</p>
              </div>
              <div class="manger">
                <p>مدير ادارة الموهوبين</p>
                <p>name</p>
              </div>
            </div>
          </div>
        </div>
      </body>

      </html>

    `;
};