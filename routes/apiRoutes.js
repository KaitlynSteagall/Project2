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
        id: request.params.id
      }
    })
      .then(puffinFromDB => {
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
  app.get("/api/puffins/:id", (request, response) => {
    db.User.findOne({
      where: {
        id: request.params.id
      }
    })
      .then(userFromDB => {
        response.json(userFromDB);
      });
  });

  // get notes by puffin id
  app.get("/api/notes/:puffID", (request, response) => {
    db.Notes.findAll({
      where: {
        puffinKey: request.params.puffID
      }
    })
      .then(noteDB => {
        response.json(noteDB);
      });
  });


  //--------------
  //  POST routes
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
  // delete puffin
  app.delete("/api/puffin/:id", (request, response) => {
    db.Puffin.destroy({ where: { id: request.params.id } }).then(
      dbPostRemoval => {
        response.json(dbPostRemoval);
      });
  });

  // delete user
  app.delete("/api/user/:id", (request, response) => {
    db.User.destroy({ where: { id: request.params.id } }).then(
      dbPostRemoval => {
        response.json(dbPostRemoval);
      });
  });
};
