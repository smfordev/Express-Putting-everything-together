const express = require('express');
const router = express.Router();

let books = [];


// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// GET all books
function getAllBooks() {
  return books;
}
;

// POST a new book
router.post('/addBook', (req, res) => {
    console.log(req.body);
  const { title, author } = req.body;
  const newBook = { title, author };
  books.push(newBook);
  res.redirect('/books');
});

module.exports = {router, getAllBooks};
