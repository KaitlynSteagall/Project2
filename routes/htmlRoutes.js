var db = require("../models");
const auth = require("./authentication");

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
  app.get("/admin", auth.userIsAdmin, (request, response) => {
    response.render("level1home");
  });

  // load researcher page
  app.get("/researcher", auth.userIsResearcher, (request, response) => {
    response.render("level2home");
  });

  // load image page: all images for specific puffin
  app.get("/images/:id", (request, response) => {
    db.imageUrl
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
