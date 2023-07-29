const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("./models/User");

const bcrypt = require("bcrypt");

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrecy",
};

function configPassport(passport) {
  const verifyLocal = async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false);
      } else {
        const compareResult = await bcrypt.compare(password, user.password);
        if (compareResult) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    } catch (err) {
      return done(err);
    }
  };

  const verifyGoogle = async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ googleID: profile.id });

      if (!user) {
        const createdUser = await User.create({
          username: profile.displayName,
          googleID: profile.id,
        });
        console.log(createdUser);
        done(null, createdUser);
      } else {
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  };

  passport.use(new LocalStrategy(verifyLocal));
  passport.use(new GoogleStrategy(googleStrategyOptions, verifyGoogle));

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const authUser = await User.findOne({ _id: id });
      return done(null, authUser);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = configPassport;
