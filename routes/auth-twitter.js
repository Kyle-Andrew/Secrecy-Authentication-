const express = require("express");
const router = express.Router();

const passport = require("passport");

router.route("/").get(passport.authenticate("twitter"));

router.route("/secrecy").get(
  passport.authenticate("twitter", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

module.exports = router;
