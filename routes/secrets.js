const express = require("express");
const router = express.Router();

const allowAuthenticatedUsers = require("../authentication-checks/allowAuthenticatedUsers");

const User = require("../models/User");

router.route("/").get(allowAuthenticatedUsers, async (req, res) => {
  const user = req.user.username;
  const allUsers = await User.find();

  const allSecrets = allUsers.reduce((runningTotal, singleUser) => {
    const userSecrets = singleUser.secrets;
    return (runningTotal = [...runningTotal, ...userSecrets]);
  }, []);

  res.render("secrets", { user, allSecrets });
});

module.exports = router;
