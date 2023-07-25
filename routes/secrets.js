const express = require("express");
const router = express.Router();

const allowAuthenticatedUsers = require("../authentication-checks/allowAuthenticatedUsers");

router
  .route("/")
  .get(allowAuthenticatedUsers, (req, res) => {
    res.render("secrets", { user: req.user.username });
  })
  .post();

module.exports = router;
