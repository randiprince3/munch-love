var authController = require("../controllers/authcontroller.js");
module.exports = function(app, passport) {
  // This links to the front page
  app.get("/frontpage", authController.frontpage);
  app.get("/", authController.front);

  app.get("/signup", checkLogIn, authController.signup);
  app.get("/login", checkLogIn, authController.login);
  app.get("/aboutus", authController.aboutus);

  app.get("/searchresults/:location", authController.searchresults);
  app.get("/searchresults1/:location", authController.searchresults1);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup"
    })
  );
  app.get("/profile", isLoggedIn, authController.profile);
  app.get("/api/favorites", authController.favorites);
  app.get("/logout", authController.logout);
  app.post(
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  );
  app.get("*", authController.error);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/login");
    }
  }

  function checkLogIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/profile");
    }
  }
};
