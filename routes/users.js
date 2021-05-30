const express = require("express");
const passport = require("passport");
const User = require("../models/index").User;

const router = express.Router();

router.get("/register", (req, res) => {
  let error = [];
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/register", async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  console.log(name, email, password, passwordConfirm);
  let error = [];
  if (!name || !email || !password || !passwordConfirm) {
    error.push({ msg: "Please fill in the form" });
  }
  if (password !== passwordConfirm) {
    error.push({ msg: "Password and Password Confirm didnot match" });
  }
  if (password.length < 8) {
    error.push({ msg: "Password should be atleast 8 character" });
  }
  //   console.log(error.length);
  if (error.length > 0) {
    res.render("register", {
      error,
      name,
      email,
      password,
      passwordConfirm,
    });
  } else {
    const user = await User.findOne({ where: { email } });
    if (user) {
      error.push({ msg: "User already exist. Please go to the login" });
      res.render("register", { error, name, email, password, passwordConfirm });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      req.flash(
        "success_msg",
        "You are now registered. Login to get access..."
      );
      res.redirect("/users/login");
    }
  }
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/message",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
module.exports = router;
