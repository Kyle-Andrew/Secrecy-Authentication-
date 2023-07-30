require("dotenv").config();

const express = require("express");
const app = express();

const session = require("express-session");

app.use(
  session({
    name: "Secrecy.SID",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

const passport = require("passport");

const configPassport = require("./passport-configuration");
configPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/usersDB");

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

const secretsRouter = require("./routes/secrets");
app.use("/secrets", secretsRouter);

const logoutRouter = require("./routes/logout");
app.use("/logout", logoutRouter);

const googleAuthRouter = require("./routes/auth-google");
app.use("/auth/google", googleAuthRouter);

const facebookAuthRouter = require("./routes/auth-facebook");
app.use("/auth/facebook", facebookAuthRouter);

const twitterRouter = require("./routes/auth-twitter");
app.use("/auth/twitter", twitterRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000.");
});
