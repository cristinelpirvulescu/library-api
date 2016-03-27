const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Book = require('../models/book');
const User = require('../models/user');
const config = require('../config');
const express = require('express');
const app = express();
const router = module.exports = express.Router();

app.set('secretToken', config.secret);

/**
 * Verify authentication token
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next
 * @return {Object} Success/failure response
 */
const verifyAuthToken = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('secretToken'), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      }

      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};

const createUser = User.createUser.bind(User);
router.post('/signup', createUser);

const authenticateUser = User.authenticateUser.bind(User);
router.post('/auth', authenticateUser);

// route middleware to verify a token
router.use(verifyAuthToken);

const getBooks = Book.getBooks.bind(Book);
router.get('/books', getBooks);

const addBook = Book.addBook.bind(Book);
router.post('/books', addBook);

const updateBook = Book.updateBook.bind(Book);
router.put('/books/:id', updateBook);

const deleteBook = Book.deleteBook.bind(Book);
router.delete('/books/:id', deleteBook);
