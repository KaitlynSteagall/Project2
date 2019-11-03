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
      url: "/api/puffins",
      type: "GET"
    });
  },
  promoteData: function(id) {
    return $.ajax({
      url: "/api/public/" + id,
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
      url: "/api/users",
      type: "GET"
    });
  },
  checkUser: function(currentUserData) {
    return $.ajax({
      url: "api/checkuser",
      type: "POST",
      data: currentUserData
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

$("#signinButton").on("click", event => {
  event.preventDefault();
  const userEnteredInfo = {
    userName: $("#username")
      .val()
      .trim(),
    passwordName: $("#userPassword")
      .val()
      .trim()
  };
  API.checkUser(userEnteredInfo).then(infoFromServer => {
    // the server will tell us if the password is good or not, and what access level we have
    if (infoFromServer.isValid === false) {
      alert("Sorry, that password doesn't match our records!");
    } else if (infoFromServer.accessLevel === 1) {
      alert("yay you're an admin");
      // TODO: create some kind of local storage to keep us logged in long-term
    } else if (infoFromServer.accessLevel === 2) {
      alert("yay you're a researcher");
      // again with the local storage
    }
  });
});

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// add new user to user DB on admin submission click
$("#submitNewUser").on("click", event => {
  event.preventDefault();

  const userInfo = {
    userName: $("#addUserName")
      .val()
      .trim(),
    passwordName: $("#addUserPassword")
      .val()
      .trim(),
    accessLevel: $("#addUserAccessLevel")
      .val()
      .trim()
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

  API.saveNewUser(userInfo).then(returnData => {
    console.log(returnData);
  });
});

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };
