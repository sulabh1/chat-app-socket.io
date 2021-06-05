const passport = require("passport");
const User = require("./../models").User;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const secret = require("./../secret/secretFile");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: secret.google.clientId,
        clientSecret: secret.google.clientSecret,
        callbackURL: "http://localhost:3333/users/google/callback",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ where: { google: profile.id } });

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.google = profile.id;
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.userImage = profile.photos.values;

          await newUser.save();
          return done(null, newUser);
        }
      }
    )
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
