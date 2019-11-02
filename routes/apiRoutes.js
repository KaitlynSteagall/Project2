//===============================================
//  database routes; saving and retrieving data
//===============================================

// get models from sequelize files
const db = require("../models");

module.exports = function(app) {
  //-------------
  //  GET routes
  //-------------
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
        userIndex: request.params.id
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

  //--------------
  //  CREATE routes
  //--------------

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
};
