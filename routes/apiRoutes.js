//===============================================
//  database routes; saving and retrieving data
//===============================================

// get models from sequelize files, middleware from authentication
const db = require("../models");
const auth = require("./authentication");

//----------------
//  functions
//----------------

// move data from public to puffin DB
function pushPublicPuffin(dataObject, puffinID) {
  // add any notes to the note db
  db.Notes.create({
    notes: dataObject.text,
    puffinIndex: puffinID
  });
  // add any images to the image db
  db.Imageurls.create({
    imgurl: dataObject.imgurl,
    artistName: dataObject.name,
    puffinIndex: puffinID
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
    db.Puffins.findOne({
      where: {
        puffinIndex: request.params.id
      }
    }).then(puffinFromDB => {
      response.json(puffinFromDB);
    });
  });

  // get all users
  app.get("/api/users", auth.userIsAdmin, (request, response) => {
    db.Users.findAll({}).then(usersFromDB => {
      response.json(usersFromDB);
    });
  });

  // get particular user
  app.get("/api/users/:id", auth.userIsAdmin, (request, response) => {
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
    db.Notes.findAll({
      where: {
        puffinIndex: request.params.puffID
      },
      order: {
        createdAt: "ASC"
      }
    }).then(noteDB => {
      response.json(noteDB);
    });
  });

  // get public posts for review
  app.get("/api/public", auth.userIsResearcher, (request, response) => {
    db.Public.findAll({
      order: {
        createdAt: "DESC"
      }
    }).then(publicDB => {
      response.json(publicDB);
    });
  });

  // validate user login
  app.post("/api/checkuser", (request, response) => {
    console.log("object going to server is: ", request.body);
    const nameToCheck = request.body.userName;
    const passToCheck = request.body.passwordName;
    console.log("validation is checking against: ", nameToCheck, passToCheck);
    let responseObject = {
      isValid: false,
      accessLevel: 0
    };
    db.Users.findOne({
      where: {
        userName: nameToCheck
      }
    }).then(userFromDB => {
      console.log("sequelize found:", userFromDB.dataValues);
      if (passToCheck === userFromDB.dataValues.passwordName) {
        responseObject.isValid = true;
        responseObject.accessLevel = userFromDB.dataValues.accessLevel;
        auth.userAuthenticationLevel = userFromDB.dataValues.accessLevel;
      }
      if (userFromDB.dataValues.accessLevel === 1) {
        console.log("we got admin access, should be sending page 1");
        response.redirect("level1Home");
      } else if (userFromDB.dataValues.accessLevel === 2) {
        console.log("we got researcher access, should be sending page 2");
        response.redirect("level2Home");
      } else {
        response.json(responseObject);
      }
    });
  });

  // get information from selected public post, move it to puffin table
  app.get("/api/public/id", auth.userIsResearcher, (request, response) => {
    db.Public.findOne({
      where: {
        publicIndex: request.params.id
      }
    }).then(publicObject => {
      // returns an object from the Public submission server
      const dataObject = {
        imageurl: publicObject.photos,
        name: publicObject.publicName,
        text: publicObject.comments
      };
      db.Public.destroy({
        where: {
          publicIndex: request.params.id
        }
      });
      pushPublicPuffin(dataObject, puffinID);
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
  app.post("/api/puffins", auth.userIsResearcher, (request, response) => {
    db.Puffins.create(request.body).then(pushedPuffin => {
      response.json(pushedPuffin);
    });
  });

  // Push new user to database
  app.post("/api/users", auth.userIsAdmin, (request, response) => {
    db.Users.create(request.body).then(pushedUser => {
      response.json(pushedUser);
    });
  });

  //----------------
  //  REMOVE routes
  //----------------

  // Delete functions are restricted to admin access

  // delete user
  app.delete("/api/user/:id", auth.userIsAdmin, (request, response) => {
    db.Users.destroy({ where: { userIndex: request.params.id } }).then(
      dbPostRemoval => {
        response.json(dbPostRemoval);
      }
    );
  });

  // delete entry from public database
  app.delete("/api/public/:id", auth.userIsResearcher, (request, response) => {
    db.Public.destroy({ where: { publicIndex: request.params.id } }).then(
      dbPostRemoval => {
        response.json(dbPostRemoval);
      }
    );
  });
};
