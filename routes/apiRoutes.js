//===============================================
//  database routes; saving and retrieving data
//===============================================

// get models from sequelize files
const db = require("../models");

module.exports = function(app) {
  //---------------
  //  READ routes
  //---------------
  // get all puffins
  app.get("/api/puffins", (request, response) => {
    db.Puffin.findAll({}).then(puffinsFromDB => {
      response.json(puffinsFromDB);
    });
  });

  // get particular puffin
  app.get("/api/puffins/:id", (request, response) => {
    db.Puffin.findOne({
      where: {
        puffinIndex: request.params.id
      }
    }).then(puffinFromDB => {
      response.json(puffinFromDB);
    });
  });

  // get all users
  app.get("/api/users", (request, response) => {
    db.User.findAll({}).then(usersFromDB => {
      response.json(usersFromDB);
    });
  });

  // get particular user
  app.get("/api/users/:id", (request, response) => {
    db.User.findOne({
      where: {
        userName: request.params.id
      }
    }).then(userFromDB => {
      response.json(userFromDB);
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
  app.get("/api/public", (request, response) => {
    db.Public.findAll({
      order: {
        createdAt: "DESC"
      }
    }).then(publicDB => {
      response.json(publicDB);
    });
  });

  // validate user login
  app.get("/api/checkuser", (request, response) => {
    const nameToCheck = request.body.userName;
    const passToCheck = request.body.userPassword;
    const responseObject = {
      isValid: false,
      accessLevel: 0
    };
    db.User.findOne({
      where: {
        userName: nameToCheck
      }
    }).then(userFromDB => {
      if (passToCheck === userFromDB.passwordName) {
        responseObject.isValid = true;
        responseObject.accessLevel = userFromDB.accessLevel;
      }
      response.json(responseObject);
    });
  });

  //----------------
  //  UPDATE routes
  //----------------

  // get information from selected public post, move it to puffin table
  app.get("/api/public/id", (request, response) => {
    db.Public.findOne({
      where: {
        publicIndex: request.params.id
      }
    }).then(publicObject => {
      const dataObject = {
        imageurl: publicObject.photos,
        name: publicObject.publicName,
        text: publicObject.comments
      };
      pushPublicPuffin(dataObject, puffinID);
    });
    response.json(publicObject);
  });

  //----------------
  //  CREATE routes
  //----------------

  // Push new puffin to database
  app.post("/api/puffins", (request, response) => {
    db.Puffin.create(request.body).then(pushedPuffin => {
      response.json(pushedPuffin);
    });
  });

  // Push new user to database
  app.post("/api/users", (request, response) => {
    db.User.create(request.body).then(pushedUser => {
      response.json(pushedUser);
    });
  });

  //----------------
  //  REMOVE routes
  //----------------

  // Delete functions are restricted to admin access

  // delete user
  app.delete("/api/user/:id", (request, response) => {
    db.User.destroy({ where: { userIndex: request.params.id } }).then(
      dbPostRemoval => {
        response.json(dbPostRemoval);
      }
    );
  });

  // delete entry from public database
  app.delete("/api/public/:id", (request, response) => {
    db.Public.destroy({ where: { publicIndex: request.params.id } }).then(
      dbPostRemoval => {
        response.json(dbPostRemoval);
      }
    );
  });

  //----------------
  //  functions
  //----------------

  // move data from public to puffin DB
  function pushPublicPuffin(dataObject, puffinID) {
    // add any notes to the note db
    db.Note.create({
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
};
