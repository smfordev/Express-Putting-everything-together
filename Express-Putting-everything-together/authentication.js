const express = require('express');
const User = require('./user');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/authentication',
  failureFlash: true
}));


module.exports = router;
