const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const User = require("../models/User");

const bcrypt = require("bcrypt");

router
  .route("/")

  .get((req, res) => {
    res.render("login");
  })

  .post(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const loginAttempt = await User.findOne({ username: username });

      if (loginAttempt) {
        bcrypt.compare(password, loginAttempt.password).then((compareMatch) => {
          if (compareMatch) {
            res.render("secrets");
          } else {
            res.json({ message: "Username and Password do not match." });
          }
        });
      } else {
        res.json({ message: "No user found with that username." });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  });

module.exports = router;
