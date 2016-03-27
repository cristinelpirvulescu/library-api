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
 * Authenticate an existing user
 * @param  {Object} req - Request object
 * @param  {Object} res - Response object
 * @return {Object} Success/failure response
 */
const authenticateUser = (req, res) => {
  const reqBody = req.body;
  const passwordClear = reqBody.password;

  // find the test user
  User.findOne({ username: reqBody.username }, (err, user) => {
    if (err) {
      return res.sendStatus(500);
    }

    if (!user) {
      return res.json({
        success: false,
        message: 'Authentication failed. User not found.',
      });
    }

    // check passwords matching
    bcrypt.compare(passwordClear, user.password, (errCompare, resCompare) => {
      if (!resCompare) {
        return res.json({
          success: false,
          message: 'Authentication failed. Wrong password',
        });
      }

      // if user was found and the password is right create a token
      const token = jwt.sign(user, app.get('secretToken'), {
        expiresIn: 3600, // expires in 1h
      });

      return res.json({
        success: true,
        message: 'Token was created.',
        token: token,
      });
    });
  });
};

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

// authenticate route
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
