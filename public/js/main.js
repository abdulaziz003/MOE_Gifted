
// Show level-1 exam
// check the checkbox value
function changeLevelOneExam() {
  let checkbox = document.getElementById("defaultCheck1");
  if (checkbox.checked) {
    checkbox.setAttribute("value", true);
    document.getElementById("level-1").removeAttribute("hidden");
    document.getElementById("level-1-mark").setAttribute("required", true);
    document.getElementById("level-1-year").setAttribute("required", true);
  } else {
    checkbox.setAttribute("value", false);
    document.getElementById("level-1-mark").removeAttribute("required");
    document.getElementById("level-1-year").removeAttribute("required");
    document.getElementById("level-1").setAttribute("hidden", true);
  }
}

// Show level-2 exam
// check the checkbox value
function changeLevelTwoExam() {
  let checkbox = document.getElementById("defaultCheck2");
  if (checkbox.checked) {
    checkbox.setAttribute("value", true);
    document.getElementById("level-2").removeAttribute("hidden");
    document.getElementById("level-2-mark").setAttribute("required", true);
    document.getElementById("level-2-year").setAttribute("required", true);
  } else {
    checkbox.setAttribute("value", false);
    document.getElementById("level-2-mark").removeAttribute("required");
    document.getElementById("level-2-year").removeAttribute("required");
    document.getElementById("level-2").setAttribute("hidden", true);
  }
}

// Show level-3 exam
// check the checkbox value
function changeLevelThreeExam() {
  let checkbox = document.getElementById("defaultCheck3");
  if (checkbox.checked) {
    checkbox.setAttribute("value", true);
    document.getElementById("level-3").removeAttribute("hidden");
    document.getElementById("level-3-mark").setAttribute("required", true);
    document.getElementById("level-3-year").setAttribute("required", true);
  } else {
    checkbox.setAttribute("value", false);
    document.getElementById("level-3-mark").removeAttribute("required");
    document.getElementById("level-3-year").removeAttribute("required");
    document.getElementById("level-3").setAttribute("hidden", true);
  }
}

