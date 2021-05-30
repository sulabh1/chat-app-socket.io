const express = require("express");
const protected = require("./../auth/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/message", protected.ensureAuthenticated, (req, res) => {
  res.render("message");
});
module.exports = router;
