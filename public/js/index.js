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
      url: "/api/checkuser",
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

$("#puffinSearch").on("click", function(event) {
  console.log("puffinSearch function");
  event.preventDefault();
  $.ajax({
    url: "/api/search/puffins",
    type: "GET"
  });
});

//on click to search one specific puffin
$("#submitSearchPuffin").on("click", function(event) {
  event.preventDefault();
  alert("puffin search");
  const puffinInfo = {
    puffinIndex: $("#puffinID")
      .val()
      .trim()
  };
  API.getOnePuffin(puffinInfo).then(returnData => {
    console.log(returnData);
  });
});

$("#publicSubmissions").on("click", function(event) {
  event.preventDefault();
  alert("public submissions");
});

$("#Logout").on("click", function(event) {
  event.preventDefault();
  alert("You have logged out!");
});

//on click for admin to remove user
$("#removeuser").on("click", function(event) {
  event.preventDefault();
  const userInfo = {
    userName: $("#username")
      .val()
      .trim(),
    passwordName: $("#userPassword")
      .val()
      .trim(),
    accessLevel: $("#userAccessLevel")
      .val()
      .trim()
  };
  if (!(userInfo.userName && userInfo.passwordName && userInfo.accessLevel)) {
    alert("You must enter a username, password and access level!");
    return;
  }

  API.deleteUser(userInfo).then(returnData => {
    console.log(returnData);
  });
});

//on click for admin to create new user
$("#submitNewUser").on("click", event => {
  event.preventDefault();

  const userInfo = {
    userName: $("#username")
      .val()
      .trim(),
    passwordName: $("#userPassword")
      .val()
      .trim(),
    accessLevel: $("#userAccessLevel")
      .val()
      .trim()
  };

  if (!(userInfo.userName && userInfo.passwordName && userInfo.accessLevel)) {
    alert("You must enter a username, password and access level!");
    return;
  }

  API.saveNewUser(userInfo).then(returnData => {
    console.log(returnData);
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
