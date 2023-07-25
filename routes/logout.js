const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  req.logout((err) => {
    if (err) {
      res.json({ message: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
