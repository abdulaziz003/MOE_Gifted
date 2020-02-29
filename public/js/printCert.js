
const coursesLength = document.getElementById('coursesLength').value;
const data = {};
for (let i = 0; i < coursesLength; i++){
  document.getElementById(`print_cert_${i}`).addEventListener('click', async()=>{
  data.studentName = document.getElementById(`studentName_${i}`).value;
  data.studentSchool = document.getElementById(`studentSchool_${i}`).value;
  data.courseName = document.getElementById(`courseName_${i}`).value;
  data.courseDuration = document.getElementById(`courseDuration_${i}`).value;
  data.courseLocation = document.getElementById(`courseLocation_${i}`).value;
  const rawResponse = await fetch('http://localhost:7070/certificates/create-pdf', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  window.open('http://localhost:7070/certificates/fetch-pdf');
  // const content = await rawResponse.json();

  // console.log(content);
  })
}

