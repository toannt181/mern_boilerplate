
/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../');

const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new TwitterStrategy(
  {
    consumerKey: config.twitter.clientID,
    consumerSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL,
  },
  ((accessToken, refreshToken, profile, done) => {
    const options = {
      criteria: { 'twitter.id_str': profile.id },
    };
    User.load(options, (err, user) => {
      if (err) return done(err);
      if (!user) {
        user = new User({
          name: profile.displayName,
          username: profile.username,
          provider: 'twitter',
          twitter: profile._json,
        });
        user.save((err) => {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }),
);
