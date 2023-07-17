const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const User = require("../models/User");

router
  .route("/")

  .get((req, res) => {
    res.render("register");
  })

  .post(async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });

      await newUser.save();
      res.redirect("/login");
    } catch (err) {
      res.json({ message: err.message });
    }
  });

module.exports = router;
