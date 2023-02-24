
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config()

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "https://cse341-project2-zacht.onrender.com/oauth-callback"
    // callbackURL: "http://localhost:3000/oauth-callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
  
));