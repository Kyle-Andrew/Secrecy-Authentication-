const express = require("express");
const router = express.Router();

const passport = require("passport");

router.route("/").get(
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.route("/secrecy").get(
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

module.exports = router;
