const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const helmet = require("helmet");
require("./auth/passport")(passport);
require("./auth/passport-facebook")(passport);
require("./auth/passport-google")(passport);
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my session secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(helmet());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

module.exports = app;
