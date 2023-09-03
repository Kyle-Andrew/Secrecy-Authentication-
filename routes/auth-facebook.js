const express = require("express");
const router = express.Router();

const passport = require("passport");

router.route("/").get(passport.authenticate("facebook"));

router.route("/secrecy").get(
  passport.authenticate("facebook", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

module.exports = router;
