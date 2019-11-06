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
  saveNewPublicEntry: function(addNewPublicData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/public",
      data: JSON.stringify(addNewPublicData)
    });
  },
  getOnePuffin: function(id) {
    console.log("id is ", id);
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
  promoteData: function(dataToSend) {
    return $.ajax({
      url: "/api/public/add",
      type: "GET",
      data: JSON.stringify(dataToSend)
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
  getId: function(currentUserData) {
    return $.ajax({
      url: "/api/getId",
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
  },
  getSinglePuffinNote: function(puffID) {
    console.log("function single puffin note ", puffID);
    return $.ajax({
      url: "/api/notes/" + puffID,
      type: "GET"
    });
  },
  getAllPublicEntries: function() {
    return $.ajax({
      url: "/api/public",
      type: "GET"
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
    console.log("check user back from api route", infoFromServer);
    // the server will tell us if the password is good or not, and what access level we have
    if (infoFromServer.isValid === false) {
      alert("Sorry, that password doesn't match our records!");
    } else if (infoFromServer.accessLevel === 1) {
      // return $.ajax({
      //   url: "/admin",
      //   type: "GET"
      // });
      window.location = "/admin";
      // TODO: create some kind of local storage to keep us logged in long-term
    } else if (infoFromServer.accessLevel === 2) {
      window.location = "/researcher";
      // again with the local storage
    }
  });
});

//on click to search one specific puffin
$("#puffinSearch").on("click", function(event) {
  console.log("puffin search clicked");
  event.preventDefault();
  var puffinInfo = $("#puffinSearchID")
    .val()
    .trim();
  console.log("user entered puffin search", puffinInfo);
  API.getOnePuffin(puffinInfo).then(returnData => {
    console.log("Puffin data returned", returnData);
    console.log("Puffin !!!! ", returnData.puffinIndex, returnData.puffinName);
    $("#puffinResult").append(
      "<tr> <th scope='row'>" +
        returnData.puffinIndex +
        "</th>" +
        "<td>" +
        returnData.puffinName +
        "</td>" +
        "<td>" +
        returnData.gender +
        "</td>" +
        "<td>" +
        returnData.age +
        "</td>" +
        "<td>" +
        returnData.updatedAt +
        "</td>" +
        "<td>" +
        returnData.createdAt +
        "</td>" +
        "</tr>"
    );
    $("#selectPuffin").on("click", event => {
      event.preventDefault();
      var puffID = returnData.puffinIndex;
      console.log("puffinID ", puffID);
      API.getSinglePuffinNote(puffID).then(returnData => {
        console.log("puffin note return data ", returnData);
        for (var i = 0; i < returnData.length; i++) {
          $("#notesTablePrint").append(
            "<tr> <th scope='row'>" +
              returnData[i].notesIndex +
              "</th>" +
              "<td>" +
              returnData[i].notes +
              "</td>" +
              "<td>" +
              returnData[i].createdAt +
              "</td>" +
              "<td>" +
              returnData[i].updatedAt +
              "</td>" +
              "<td>"
          );
        }
      });
    });
  });
});

$("#publicSubmissions").on("click", function(event) {
  event.preventDefault();
  alert("public submissions");
});

$("#publicSubmitsBtn").on("click", function(event) {
  event.preventDefault();
  API.getAllPublicEntries().then(returnData => {
    console.log("public return data ", returnData);
    for (var i = 0; i < returnData.length; i++) {
      console.log(returnData[i]);
      $("#submissions").append(
        "<tr> <th scope='row'>" +
          returnData[i].publicName +
          "</th>" +
          "<td>" +
          returnData[i].comments +
          "</td>" +
          "<td>" +
          returnData[i].photos +
          "</td>" +
          "<td>" +
          `<td><button class="btn" id="approveBtn" style="background-color:aquamarine" entryID=${returnData[i].publicIndex}>Approve</button></th>` +
          `<td><button class="btn" id="denyBtn" style="background-color:aquamarine" entryID=${returnData[i].publicIndex}>Deny</button></th>`
      );
    }
  });
});

$(document).on("click", "#approveBtn", event => {
  event.preventDefault();
  console.log("approve button clicked");
  const entryID = $(this).attr("entryID");
  const userEnteredInfo = {
    puffinIndex: $("#puffinIDdiv")
      .val()
      .trim(),
    publicIndex: entryID
  };
  API.promoteData(userEnteredInfo).then();
});

$("#Logout").on("click", function(event) {
  event.preventDefault();
  window.location = "/";
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
  API.getId(userInfo).then(returnData => {
    console.log("index console", returnData);
    var deleteUserIndex = returnData;
    API.deleteUser(deleteUserIndex).then(returnData => {
      console.log(returnData);
    });
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

//on click for admin or researcher to create new puffin
$("#submitNewPuffin").on("click", event => {
  event.preventDefault();

  const puffinInfo = {
    puffinName: $("#nickname")
      .val()
      .trim(),
    gender: $("#gender")
      .val()
      .trim(),
    age: $("#age")
      .val()
      .trim()
  };

  if (!puffinInfo.puffinName) {
    alert("You must enter a puffin name");
    return;
  }

  API.saveNewPuffin(puffinInfo).then(returnData => {
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
