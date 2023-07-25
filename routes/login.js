const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const allowUnauthenticatedUsers = require("../authentication-checks/allowUnauthenticatedUsers");

const passport = require("passport");

router
  .route("/")

  .get(allowUnauthenticatedUsers, (req, res) => {
    res.render("login");
  })

  .post(
    passport.authenticate("local", {
      successRedirect: "/secrets",
      failureRedirect: "/login",
    })
  );

module.exports = router;
