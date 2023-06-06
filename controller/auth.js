const passport = require('passport');
const {
  createUser,
  checkUser,
  updateLastAccess,
} = require('../Model/usermodel');

const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/facebook/callback',
      profileFields: ['id', 'name', 'emails'],
    },
    async function (accessToken, refreshToken, profile, done) {
      const email = profile._json.id;
      const displayName = profile._json.first_name;
      // console.log(profile);
      const created_at = new Date();
      // console.log(displayName, email);
      try {
        const checkUsr = await checkUser(email);
        if (checkUsr.length === 0) {
          await createUser(displayName, email, created_at);
          done(null, profile);
        } else {
          const updateData = [new Date(), email];
          await updateLastAccess(updateData);
          done(null, profile);
        }
      } catch (error) {
        // console.log('error is ', error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
