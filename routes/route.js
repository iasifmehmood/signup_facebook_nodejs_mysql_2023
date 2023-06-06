const express = require('express');
const passport = require('passport');
const { htmlFileSend } = require('../controller/htmlController');

const Router = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

Router.get('/', htmlFileSend);

Router.get('/auth/facebook', passport.authenticate('facebook'));

Router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'reauthenticate',
    scope: ['email'],
  })
);

Router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/failure',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/auth/facebook/success');
  }
);

Router.get('/auth/facebook/failure', isLoggedIn, (req, res) => {
  res.send('Something went wrong!');
});

Router.get('/auth/facebook/success', isLoggedIn, (req, res) => {
  const name = req.user._json.first_name;
  // console.log(req.user);
  return res.status(200).send(`hello there! ${name}`);
});

Router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
module.exports = Router;
