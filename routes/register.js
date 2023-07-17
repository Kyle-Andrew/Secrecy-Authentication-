const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const User = require("../models/User");

const bcrypt = require("bcrypt");
const saltRouounds = 10;

router
  .route("/")

  .get((req, res) => {
    res.render("register");
  })

  .post(async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, saltRouounds),
      });

      await newUser.save();
      res.redirect("/login");
    } catch (err) {
      res.json({ message: err.message });
    }
  });

module.exports = router;
