var bCrypt = require("bcrypt");
module.exports = function(passport, userinfo) {
  var Userinfo = userinfo;
  var LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        email: "email",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        Userinfo.findOne({
          where: {
            username: username
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That username is already taken"
            });
          } else {
            var userPassword = generateHash(password);
            var data = {
              username: username,
              password: userPassword,
              email: req.body.email
            };
            Userinfo.create(data).then(function(user) {
              if (!user) {
                return done(null, false);
              } else {
                user.get();
                console.log("HELLOOO FROM PASSPORT.JSSSSS >>>>>>>>>>", user);
                return done(null, user);
              }
            });
          }
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Userinfo.findOne({
      where: {
        id: id
      }
    }).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        var Userinfo = userinfo;
        var isValidPassword = function(accountKey, password) {
          return bCrypt.compareSync(password, accountKey);
        };
        Userinfo.findOne({
          where: {
            username: username
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Username does not exist"
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            } else {
              user.get();
              console.log("PASSPORT>>>>>>>", user.id);
              return done(null, user);
            }
          })
          .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    Userinfo.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
