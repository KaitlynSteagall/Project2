var db = require("../models");

// pages
//  homepage (login, public data submission)
//  display specific penguin data
//  display specific researcher data
//  display all penguins
//  display image thumbnails, which can be blown up into modals
//  admin access: add/drop users, approve/reject submissions, add penguins
//  user access: approve/reject submissions, add penguins

module.exports = function(app) {
  // Load index page
  app.get("/", (request, response) => {
    response.render("index");
  });

  // load specific puffin's page, notes, some random images
  app.get("/puffins/:id", (request, response) => {
    db.puffins
      .findOne({ where: { id: request.params.id } })
      .then(targetPuffin => {
        response.render("example", {
          example: targetPuffin //"example" is the name of the handlebars file
        });
      });
  });

  // load admin page
  app.get("/admin", (request, response) => {
    response.render("level1home");
  });

  // load researcher page
  app.get("/researcher", (request, response) => {
    response.render("level2home");
  });

  // load image page: all images for specific puffin
  app.get("/images/:id", (request, response) => {
    db.images
      .findAll({ where: { puffinId: request.params.id } })
      .then(imagesReturned => {
        response.render("imageThumbs", {
          images: imagesReturned
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (request, response) => {
    response.render("404");
  });
};
