// // middleware functions to validate user access level
// const auth = {
//   userAuthenticationLevel: 0,
//   userIsAdmin: function(req, res, next) {
//     console.log("called userIsAdmin check");
//     // middleware function to check for admin status
//     if (auth.userAuthenticationLevel === 1) {
//       console.log(
//         "user was cleared as admin, access level is " +
//           auth.userAuthenticationLevel
//       );
//       next();
//     } else {
//       console.log("user was not cleared as admin, telling frontend to alert");
//       alert("Authorization denied!");
//       res.redirect("/");
//     }
//   },
//   userIsResearcher: function(req, res, next) {
//     console.log("called userIsResearcher check");
//     // middleware function to check for researcher status
//     if (
//       auth.userAuthenticationLevel === 2 ||
//       auth.userAuthenticationLevel === 1
//     ) {
//       console.log(
//         "user was cleared as research or admin, access level is " +
//           auth.userAuthenticationLevel
//       );
//       next();
//     } else {
//       console.log(
//         "user was not cleared as admin/research, telling frontend to alert"
//       );
//       alert("Authorization denied!");
//       res.redirect("/");
//     }
//   }
// };

// module.exports = auth;
