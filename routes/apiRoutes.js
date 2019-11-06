//===============================================
//  database routes; saving and retrieving data
//===============================================

// get models from sequelize files, middleware from authentication
const db = require("../models");
// const auth = require("./authentication");

//----------------
//  functions
//----------------

// move data from public to puffin DB
function pushPublicPuffin(dataObject) {
  console.log(
    "got to pushPublicPuffin function, was served data object ",
    dataObject
  );
  // add any notes to the note db
  db.Notes.create({
    notes: dataObject.text,
    puffinIndex: dataObject.puffinID
  });
  // add any images to the image db
  db.Imageurls.create({
    imgurl: dataObject.imgurl,
    artistName: dataObject.name,
    puffinIndex: dataObject.puffinID
  });
}

module.exports = function(app) {
  //---------------
  //  READ routes
  //---------------

  // get all puffins
  app.get("/api/puffins", (request, response) => {
    db.Puffins.findAll({}).then(puffinsFromDB => {
      response.json(puffinsFromDB);
    });
  });

  // get particular puffin
  app.get("/api/puffins/:id", (request, response) => {
    console.log("request is ", request);
    db.Puffins.findOne({
      where: {
        puffinIndex: request.params.id
      }
    }).then(puffinFromDB => {
      console.log("puffin from Db", puffinFromDB);
      response.json(puffinFromDB);
    });
  });

  // get all users
  // app.get("/api/users", auth.userIsAdmin, (request, response) => {
  app.get("/api/users", (request, response) => {
    db.Users.findAll({}).then(usersFromDB => {
      response.json(usersFromDB);
    });
  });

  // get particular user
  // app.get("/api/users/:id", auth.userIsAdmin, (request, response) => {
  app.get("/api/users/:id", (request, response) => {
    db.Users.findOne({
      where: {
        userName: request.params.id
      }
    })
      .then(userFromDB => {
        console.log("found user: ", userFromDB);
        response.json(userFromDB);
      })
      .catch(err => {
        console.log("user id route err is: ", err);
      });
  });

  // get notes by puffin id
  app.get("/api/notes/:puffID", (request, response) => {
    console.log("route for puffin notes ", request.params.puffID);
    db.Notes.findAll({
      where: {
        PuffinPuffinIndex: request.params.puffID
      },
      order: [["createdAt", "ASC"]]
    }).then(noteDB => {
      response.json(noteDB);
    });
  });

  // get public posts for review
  // app.get("/api/public", auth.userIsResearcher, (request, response) => {
  app.get("/api/public", (request, response) => {
    db.Public.findAll({
      order: {
        createdAt: "DESC"
      }
    }).then(publicDB => {
      response.json(publicDB);
    });
  });

  //get user Id
  app.post("/api/getId", (request, response) => {
    console.log("object going to server is: ", request.body);
    const nameToCheck = request.body.userName;
    const passToCheck = request.body.passwordName;
    console.log("validation is checking against: ", nameToCheck, passToCheck);

    db.Users.findOne({
      where: {
        userName: nameToCheck,
        passwordName: passToCheck
      }
    }).then(userFromDB => {
      console.log("apiroute", userFromDB.dataValues.userIndex);
      response.json(userFromDB.dataValues.userIndex);
    });
  });

  // validate user login
  app.post("/api/checkuser", (request, response) => {
    console.log("object going to server is: ", request.body);
    const nameToCheck = request.body.userName;
    const passToCheck = request.body.passwordName;
    console.log("validation is checking against: ", nameToCheck, passToCheck);
    let responseObject = {
      exists: true,
      isValid: false,
      accessLevel: 0
    };
    db.Users.findOne({
      where: {
        userName: nameToCheck
      }
    }).then(userFromDB => {
      console.log("sequelize found:", userFromDB.dataValues);
      if (!userFromDB.dataValues) {
        responseObject.exists = false;
      }
      if (passToCheck === userFromDB.dataValues.passwordName) {
        responseObject.isValid = true;
        responseObject.accessLevel = userFromDB.dataValues.accessLevel;
        // auth.userAuthenticationLevel = userFromDB.dataValues.accessLevel;
      }
      response.json(responseObject);
    });
  });

  // get information from selected public post, move it to puffin table
  // app.get("/api/public/id", auth.userIsResearcher, (request, response) => {
  app.post("/api/public/add", (request, response) => {
    console.log("got promotable data from frontpage: ", request.body);
    db.Public.findOne({
      where: {
        publicIndex: request.body.publicIndex
      }
    }).then(publicObject => {
      // returns an object from the Public submission server
      const dataObject = {
        imageurl: publicObject.dataValues.photos,
        name: publicObject.dataValues.publicName,
        text: publicObject.dataValues.comments,
        puffinID: request.body.puffinID
      };
      // db.Public.destroy({
      //   where: {
      //     publicIndex: request.body.publicIndex
      //   }
      // });
      pushPublicPuffin(dataObject);
    });
    response.json(publicObject);
  });

  //----------------
  //  UPDATE routes
  //----------------

  //----------------
  //  CREATE routes
  //----------------

  // Push new puffin to database
  // app.post("/api/puffins", auth.userIsResearcher, (request, response) => {
  app.post("/api/puffins", (request, response) => {
    db.Puffins.create(request.body).then(pushedPuffin => {
      response.json(pushedPuffin);
    });
  });

  // Push new user to database
  // app.post("/api/users", auth.userIsAdmin, (request, response) => {
  app.post("/api/users", (request, response) => {
    db.Users.create(request.body).then(pushedUser => {
      response.json(pushedUser);
    });
  });

  // Push new public info to database
  app.post("/api/public", (request, response) => {
    db.Public.create(request.body).then(pushedData => {
      response.json(pushedData);
    });
  });

  // Push new url to image table
  app.post("/api/imageurl", (request, response) => {
    db.Imageurls.create(request.body).then(pushedData => {
      response.json(pushedData);
    });
  });

  //----------------
  //  REMOVE routes
  //----------------

  // Delete functions are restricted to admin access

  // delete user
  // app.delete("/api/users/:id", auth.userIsAdmin, (request, response) => {
  app.delete("/api/users/:id", (request, response) => {
    console.log("request param id", request.params.id);
    db.Users.destroy({ where: { userIndex: request.params.id } }).then(
      dbPostRemoval => {
        response.json(dbPostRemoval);
      }
    );
  });

  // delete entry from public database
  // app.delete("/api/public/:id", auth.userIsResearcher, (request, response) => {
  app.delete("/api/public/:id", (request, response) => {
    db.Public.destroy({ where: { publicIndex: request.params.id } }).then(
      dbPostRemoval => {
        response.json(dbPostRemoval);
      }
    );
  });
};
