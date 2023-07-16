const express = require("express");
const app = express();

app.set("view engine", "ejs");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/usersDB");

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000.");
});
