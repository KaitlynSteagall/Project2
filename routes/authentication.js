// middleware functions to validate user access level
const auth = {
  userAuthenticationLevel: 0,
  userIsAdmin: function(req, res, next) {
    // middleware function to check for admin status
    if (userAuthenticationLevel === 1) {
      return next();
    } else {
      alert("Authorization denied!");
      res.redirect("/");
    }
  },
  userIsResearcher: function(req, res, next) {
    // middleware function to check for researcher status
    if (userAuthenticationLevel === 2 || userAuthenticationLevel === 1) {
      return next();
    } else {
      alert("Authorization denied!");
      res.redirect("/");
    }
  }
};

module.exports = auth;
