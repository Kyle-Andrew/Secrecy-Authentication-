const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const allowAuthenticatedUsers = require("../authentication-checks/allowAuthenticatedUsers");

const User = require("../models/User");

router
  .route("/")
  .get(allowAuthenticatedUsers, async (req, res) => {
    const id = req.user.id;

    const user = await User.findOne({ _id: id });
    const userSecrets = user.secrets;

    res.render("manage_secrets", { user: user.username, userSecrets });
  })
  .post(async (req, res) => {
    const id = req.user.id;
    const secretID = req.body.secretID;

    try {
      const user = await User.findOne({ _id: id });
      user.secrets.splice(secretID, 1);
      await user.save();
    } catch (err) {
      res.json({ message: err.message });
    }

    res.redirect("/manage");
  });

module.exports = router;
