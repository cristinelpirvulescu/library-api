const Book = require('../models/book');
const User = require('../models/user');
const express = require('express');
const app = express();
const router = module.exports = express.Router();
const jwt = require('jsonwebtoken');

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
    name: reqBody.name,
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

router.post('/signup', createUser);

router.get('/books', getBooks);

router.post('/books', addBook);

router.put('/books/:id', updateBook);

router.delete('/books/:id', deleteBook);
