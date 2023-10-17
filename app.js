const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./user');
const flash = require('express-flash');
const booksModule = require('./books');

const initializePassport = require('./passport-config');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/users');

// set Pug as the templating engine
app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.urlencoded({ extended: false}));

initializePassport(passport, username => User.findOne({ username}))


// Middleware setup
app.use(express.json());
app.use(session({
  secret: '1',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRouter = require('./authentication');
const registerRouter = require('./registration');

app.use('/books', booksModule.router);
app.use('/auth', authRouter);
app.use('/register', registerRouter);

app.get("/registration", (req, res) => res.render('registration'));
app.get("/authentication", (req, res) => res.render('authentication'));

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If the user is authenticated, proceed to the next middleware
  }
  res.redirect('/authentication'); // If not authenticated, redirect to the login page
}

app.get('/books', isAuthenticated, (req, res) => {
  const books = booksModule.getAllBooks();
  res.render('books', {books});
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

