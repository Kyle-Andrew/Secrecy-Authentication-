const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const md5 = require("md5");

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
        password: md5(req.body.password),
      });

      await newUser.save();
      res.redirect("/login");
    } catch (err) {
      res.json({ message: err.message });
    }
  });

module.exports = router;
