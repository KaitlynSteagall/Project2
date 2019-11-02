// Get references to page elements
const $newUserName = $("#addUsername");
const $newUserPassword = $("#addUserPassword");
const $newUserAccessLevel = $("#addUserAccessLevel");

// The API object contains methods for each kind of request we'll make
const API = {
  saveNewUser: function(addNewUserData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(addNewUserData)
    });
  },
  saveNewPuffin: function(addNewPuffinData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/puffins",
      data: JSON.stringify(addNewPuffinData)
    });
  },
  getOnePuffin: function(id) {
    return $.ajax({
      url: "/api/puffins/" + id,
      type: "GET"
    });
  },
  getAllPuffins: function() {
    return $.ajax({
      url: "/api/puffins/",
      type: "GET"
    });
  },
  getOneUser: function(id) {
    return $.ajax({
      url: "/api/users/" + id,
      type: "GET"
    });
  },
  getAllUsers: function() {
    return $.ajax({
      url: "/api/users/",
      type: "GET"
    });
  },
  getNotes: function(id) {
    return $.ajax({
      url: "/api/notes/" + id,
      type: "GET"
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "/api/users/" + id,
      type: "DELETE"
    });
  },
  deletePublicEntry: function(id) {
    return $.ajax({
      url: "/api/public/" + id,
      type: "DELETE"
    });
  }
};

$("#signinButton").on("click", function() {
  var loginUsername = $("#username")
    .val()
    .trim();
  var loginUserPassword = $("#userPassword")
    .val()
    .trim();
  var userEnteredInfo = {
    userName: loginUsername,
    passwordName: loginUserPassword
  };
  $.get("/api/users/" + loginUsername, userEnteredInfo).then(function(data) {
    console.log(data);
  });
});

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var saveUser = function(event) {
  event.preventDefault();

  var userInfo = {
    newUsername: $newUserName.val().trim(),
    newUserPassword: $newUserPassword.val().trim(),
    newUserAccessLevel: $newUserAccessLevel.val().trim()
  };

  if (
    !(
      userInfo.newUsername &&
      userInfo.newUserPassword &&
      userInfo.newUserAccessLevel
    )
  ) {
    alert("You must enter a username, password and access level!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitNewUser.on("click", saveUser);
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
