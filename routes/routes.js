const Book = require('../models/book');
const User = require('../models/user');
const config = require('../config');
const express = require('express');
const app = express();
const router = module.exports = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


app.set('secretToken', config.secret);

const getBooks = (req, res) => {
  Book.find((err, books) => {
    if (err) {
      return res.send(err);
    }

    return res.json(books);
  });
};

const addBook = (req, res) => {
  const reqBody = req.body;

  const newBook = new Book({
    title: reqBody.title,
    author: reqBody.author,
    ISBN: reqBody.isbn,
    genre: reqBody.genre,
    year: reqBody.year,
  });

  newBook.save((err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const updateBook = (req, res) => {
  const reqBody = req.body;
  const bookId = req.params.id;
  const condition = { _id: bookId };

  Book.findOneAndUpdate(condition, reqBody, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const deleteBook = (req, res) => {
  const bookId = req.params.id;
  const condition = { _id: bookId };

  Book.findOneAndRemove(condition, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const createUser = (req, res) => {
  const reqBody = req.body;
  const newUser = new User({
    username: reqBody.username,
    password: reqBody.password,
  });

  // save user to database
  newUser.save((err) => {
    if (err) {
      res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};

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
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};

router.post('/signup', createUser);
// authenticate route
router.post('/auth', authenticateUser);

// route middleware to verify a token
router.use(verifyAuthToken);

router.get('/books', getBooks);

router.post('/books', addBook);

router.put('/books/:id', updateBook);

router.delete('/books/:id', deleteBook);
