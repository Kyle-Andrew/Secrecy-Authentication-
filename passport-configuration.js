const LocalStrategy = require("passport-local");

const User = require("./models/User");

const bcrypt = require("bcrypt");

function configPassport(passport) {
  const authenticateUser = async (username, password, done) => {
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
  passport.use(new LocalStrategy(authenticateUser));

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
