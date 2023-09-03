const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const allowAuthenticatedUsers = require("../authentication-checks/allowAuthenticatedUsers");

const User = require("../models/User");

router
  .route("/")
  .get(allowAuthenticatedUsers, (req, res) => {
    res.render("submit");
  })
  .post(async (req, res) => {
    const secret = req.body.secret;
    const id = req.user.id;

    try {
      if (secret !== "") {
        const user = await User.findOne({ _id: id });
        user.secrets.push(secret);
        await user.save();
      }
    } catch (err) {
      res.json({ message: err.message });
    }

    res.redirect("/secrets");
  });

module.exports = router;
