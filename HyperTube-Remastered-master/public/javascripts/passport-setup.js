const passport = require('passport');
const GithubStrategy = require('passport-github2');
const FortyTwoStrategy = require('passport-42');
const keys = require('../../config/keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	}, (err) => {
		throw err;
	});
});

passport.use(new GithubStrategy({
	clientID : keys.github.clientID,
	clientSecret : keys.github.clientSecret,
	// callbackURL : '/auth/github/redirect'
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({githubId : profile.id}).then((currentUser) => {
		if (currentUser)
			done(null, currentUser);
		else {
			new User({
				first_name : profile.displayName,
				username : profile.username,
				githubId : profile.id,
				email : profile.emails[0].value,
				thumbnail : profile.photos[0].value
			}).save().then((newUser) => {
				console.log('new user created: ' + newUser);
				done(null, newUser);
			},
			(newUser)=>{console.log('couldnt create new user: ' + newUser);})
		}
	});
}));

passport.use(new FortyTwoStrategy({
	clientID : keys.intra.clientID,
	clientSecret : keys.intra.clientSecret,
	callbackURL : '/auth/intra/redirect'
}, (accessToken, refreshToken, profile,done) => {
	User.findOne({intraId : profile.id}).then((currentUser) => {
		if (currentUser)
			done(null, currentUser);
		else {
			new User({
				first_name : profile.name.givenName,
				last_name : profile.name.familyName,
				email : profile.emails[0].value,
				username : profile.username,
				intraId : profile.id,
				thumbnail : profile.photos[0].value
			}).save().then((newUser) => {
				console.log('new user created: ' + newUser);
				done(null, newUser);
			},
			(newUser) => {console.log("could not create new user");})
		}
	})
}));