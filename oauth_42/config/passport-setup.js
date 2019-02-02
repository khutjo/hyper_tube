const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FortyTwoStrategy = require('passport-42').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});




passport.use(new FortyTwoStrategy({
    clientID: keys.fourtytwo.FORTYTWO_APP_ID,
    clientSecret: keys.fourtytwo.FORTYTWO_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/42/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({googleId: profile._json.id}).then((currentUser) => {
        if (currentUser){
            //we have the user
            console.log('user is : ', currentUser);
            done(null, currentUser);

        }else{
            new User({
                googleId: profile._json.id,
                username: profile._json.first_name+" "+profile._json.last_name,
                thumbnail: profile._json.image_url
            }).save().then((newUser) => {
                console.log('new user created: ', newUser);
                done(null, newUser);
            });
        }
    });
  }
));



passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
            console.log(profile);
        });
    })
);