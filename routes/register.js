const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const allowUnauthenticatedUsers = require("../authentication-checks/allowUnauthenticatedUsers");

const User = require("../models/User");

const bcrypt = require("bcrypt");

router
  .route("/")

  .get(allowUnauthenticatedUsers, (req, res) => {
    res.render("register");
  })

  .post(async (req, res) => {
    try {
      const username = req.body.username;
      const password = await bcrypt.hash(req.body.password, 10);

      await User.create({ username: username, password: password });
      res.redirect("/login");
    } catch (err) {
      res.json({ message: err.message });
    }
  });

module.exports = router;
