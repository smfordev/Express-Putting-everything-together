const express = require('express');
const User = require('./user');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/', async (req, res,) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash('error', 'User already exists');
      return res.redirect('/registration');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    req.flash('success', 'User registered successfully' );
    res.redirect('/registration');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;