const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleID: String,
  facebookID: String,
  twitterID: String,
});

module.exports = mongoose.model("User", userSchema);
