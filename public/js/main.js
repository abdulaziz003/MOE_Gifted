// Deleting department
$(document).ready(function () {
  $(".delete-department").on("click", function (e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/departments/delete/" + id,
      success: function (response) {
        alert("تم حذف القسم بنجاح!");
        // Redirect to departments
        window.location.href = "/departments";
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});

$(document).ready(function () {
  $("#customFileLangHTML").change(function (e) {
    var fileName = e.target.files[0].name;
    document.getElementById("customFileLangHTMLL").innerHTML =
      "    " + fileName;
  });
});

// Deleting paper
$(document).ready(function () {
  $(".delete-paper").on("click", function (e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/papers/delete/" + id,
      success: function (response) {
        alert("تم حذف المعاملة بنجاح!");
        // Redirect to papers
        window.location.href = "/papers/all";
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});

// Deleting User
$(document).ready(function () {
  $(".delete-user").on("click", function (e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/users/delete/" + id,
      success: function (response) {
        alert("تم حذف المستخدم بنجاح!");
        // Redirect to papers
        window.location.href = "/users/members";
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});

// Showing the new paper number on selecting تم التعميم او تم الرفع أو تم الرد
function changeFunc() {
  let replyBox = document.getElementById("reply-option-choice");
  let selectedReply = replyBox.options[replyBox.selectedIndex].value;
  if (
    selectedReply == "تم الاطلاع" ||
    selectedReply == "الحفظ" ||
    selectedReply == "التمشي بموجبه"
  ) {
    document.getElementById("new-paper-label").setAttribute("hidden", true);
    document.getElementById("new-paper-input").setAttribute("hidden", true);
    document.getElementById("new-paper-input").removeAttribute("required");
  } else {
    document.getElementById("new-paper-input").setAttribute("required", true);
    document.getElementById("new-paper-label").removeAttribute("hidden");
    document.getElementById("new-paper-input").removeAttribute("hidden");
  }
}

// Search dropdown triger
function searchDrop() {
  let dropDown = document.getElementById("searchInput");
  let dropDownValue = dropDown.options[dropDown.selectedIndex].value;

  switch (dropDownValue) {
    case "":
      if (
        !document.getElementById("searchPaperDate").removeAttribute("hidden")
      ) {
        document.getElementById("searchPaperDate").removeAttribute("required");
        document.getElementById("searchPaperDate").setAttribute("hidden", true);
      }
      if (
        !document.getElementById("searchPaperNumber").removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperNumber")
          .removeAttribute("required");
        document
          .getElementById("searchPaperNumber")
          .setAttribute("hidden", true);
      }
      if (
        !document
          .getElementById("searchPaperDepartment")
          .removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperDepartment")
          .removeAttribute("required");
        document
          .getElementById("searchPaperDepartment")
          .setAttribute("hidden", true);
      }
      break;
    case "archivePapers":
      if (
        !document.getElementById("searchPaperDate").removeAttribute("hidden")
      ) {
        document.getElementById("searchPaperDate").removeAttribute("required");
        document.getElementById("searchPaperDate").setAttribute("hidden", true);
      }
      if (
        !document.getElementById("searchPaperNumber").removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperNumber")
          .removeAttribute("required");
        document
          .getElementById("searchPaperNumber")
          .setAttribute("hidden", true);
      }
      if (
        !document
          .getElementById("searchPaperDepartment")
          .removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperDepartment")
          .removeAttribute("required");
        document
          .getElementById("searchPaperDepartment")
          .setAttribute("hidden", true);
      }
      break;
    case "allPapers":
      if (
        !document.getElementById("searchPaperDate").removeAttribute("hidden")
      ) {
        document.getElementById("searchPaperDate").removeAttribute("required");
        document.getElementById("searchPaperDate").setAttribute("hidden", true);
      }
      if (
        !document.getElementById("searchPaperNumber").removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperNumber")
          .removeAttribute("required");
        document
          .getElementById("searchPaperNumber")
          .setAttribute("hidden", true);
      }
      if (
        !document
          .getElementById("searchPaperDepartment")
          .removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperDepartment")
          .removeAttribute("required");
        document
          .getElementById("searchPaperDepartment")
          .setAttribute("hidden", true);
      }
      break;
    case "recent":
      if (
        !document.getElementById("searchPaperDate").removeAttribute("hidden")
      ) {
        document.getElementById("searchPaperDate").removeAttribute("required");
        document.getElementById("searchPaperDate").setAttribute("hidden", true);
      }
      if (
        !document.getElementById("searchPaperNumber").removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperNumber")
          .removeAttribute("required");
        document
          .getElementById("searchPaperNumber")
          .setAttribute("hidden", true);
      }
      if (
        !document
          .getElementById("searchPaperDepartment")
          .removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperDepartment")
          .removeAttribute("required");
        document
          .getElementById("searchPaperDepartment")
          .setAttribute("hidden", true);
      }
      break;
    case "paperNumber":
      document
        .getElementById("searchPaperNumber")
        .setAttribute("required", true);
      document.getElementById("searchPaperNumber").removeAttribute("hidden");
      if (
        !document.getElementById("searchPaperDate").removeAttribute("hidden")
      ) {
        document.getElementById("searchPaperDate").removeAttribute("required");
        document.getElementById("searchPaperDate").setAttribute("hidden", true);
      }
      if (
        !document
          .getElementById("searchPaperDepartment")
          .removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperDepartment")
          .removeAttribute("required");
        document
          .getElementById("searchPaperDepartment")
          .setAttribute("hidden", true);
      }
      break;
    case "paperDate":
      document.getElementById("searchPaperDate").removeAttribute("hidden");
      document.getElementById("searchPaperDate").setAttribute("required", true);
      if (
        !document.getElementById("searchPaperNumber").removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperNumber")
          .removeAttribute("required");
        document
          .getElementById("searchPaperNumber")
          .setAttribute("hidden", true);
      }
      if (
        !document
          .getElementById("searchPaperDepartment")
          .removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperDepartment")
          .removeAttribute("required");
        document
          .getElementById("searchPaperDepartment")
          .setAttribute("hidden", true);
      }
      break;
    case "paperDepartment":
      document
        .getElementById("searchPaperDepartment")
        .removeAttribute("hidden");
      document
        .getElementById("searchPaperDepartment")
        .setAttribute("required", true);
      if (
        !document.getElementById("searchPaperDate").removeAttribute("hidden")
      ) {
        document.getElementById("searchPaperDate").removeAttribute("required");
        document.getElementById("searchPaperDate").setAttribute("hidden", true);
      }
      if (
        !document.getElementById("searchPaperNumber").removeAttribute("hidden")
      ) {
        document
          .getElementById("searchPaperNumber")
          .removeAttribute("required");
        document
          .getElementById("searchPaperNumber")
          .setAttribute("hidden", true);
      }
  }
}

// Show password field on editing new member info
// check the checkbox value
function changeActive() {
  let checkbox = document.getElementById("validCheck3");
  if (checkbox.checked) {
    checkbox.setAttribute("value", true);
  }
  let passCheckbox = document.getElementById("passCheck");
  if (passCheckbox.checked) {
    passCheckbox.setAttribute("value", true);
    document.getElementById("password").removeAttribute("hidden");
    document.getElementById("password").setAttribute("required", true);
  } else {
    document.getElementById("password").removeAttribute("required");
    document.getElementById("password").setAttribute("hidden", true);
  }
}
// Show attachment upload field on editing a paper
// check the checkbox value
function changeAttachment() {
  let checkbox = document.getElementById("attachmentCheck");
  if (checkbox.checked) {
    checkbox.setAttribute("value", true);
  }
  let passCheckbox = document.getElementById("attachmentCheck");
  if (passCheckbox.checked) {
    passCheckbox.setAttribute("value", true);
    document.getElementById("new-attachment").removeAttribute("hidden");
    document.getElementById("new-attachment").setAttribute("required", true);
  } else {
    document.getElementById("new-attachment").removeAttribute("required");
    document.getElementById("new-attachment").setAttribute("hidden", true);
  }
}
