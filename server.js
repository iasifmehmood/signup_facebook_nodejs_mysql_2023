const express = require('express');
const passport = require('passport');
// const path = require('path');
const cors = require('cors');
const session = require('express-session');
const Routes = require('./routes/route.js');
const app = express();
require('dotenv').config();
require('./controller/auth.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './client', 'index.html'));
// });

app.use(
  session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['email', 'profile'] })
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/auth/google/success',
//     failureRedirect: '/auth/google/failure',
//   })
// );

// app.get('/auth/google/failure', isLoggedIn, (req, res) => {
//   res.send('Something went wrong!');
// });

// app.get('/auth/google/success', isLoggedIn, (req, res) => {
//   const name = req.user.displayName;
//   return res.status(200).send(`hello there! ${name}`);
// });

app.use('/', Routes);

app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
