const passport = require("passport");
const User = require("./../models").User;
const FacebookStrategy = require("passport-facebook").Strategy;
const secret = require("./../secret/secretFile");

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: secret.facebook.clientId,
        clientSecret: secret.facebook.clientSecret,
        profileFields: ["email", "displayName", "photos"],
        callbackURL: "http://localhost:3333/users/facebook/callback",
        passReqToCallback: true,
      },
      async (req, token, refreshToken, profile, done) => {
        const user = await User.findOne({ where: { facebook: profile.id } });
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.facebook = profile.id;
          newUser.name = profile.displayName;
          newUser.email = profile._json.email;
          newUser.userImage = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          console.log(newUser.dataValues);
          // console.log("profile" + profile);
          // console.log("token" + token);
          newUser.fbTokens = token;

          await newUser.save();
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
