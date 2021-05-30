const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
const User = require("./../models").User;

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          //match password
          bcrypt.compare(password, user.password, (err, isMatched) => {
            if (err) throw err;
            if (isMatched) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Incorrect email or password",
              });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } }).then((user, err) => {
      done(err, user);
    });
  });
};
