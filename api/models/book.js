'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

mongoose.connect(config.database);

const BookModel = mongoose.model('Book', {
  ISBN: 'string',
  title: 'string',
  author: 'string',
  genre: 'string',
  year: 'number',
});

/**
 * Retrieve all the books from database
 * @param  {Object} req - Request object
 * @param  {Object} res - Response object
 * @return {Array<Object>} - The list with books
 */
BookModel.getBooks = function(req, res) {
  BookModel.find((err, books) => {
    if (err) {
      return res.send(err);
    }

    return res.json(books);
  });
};

/**
 * Add a book to database
 * @param  {Object} req - Request object
 * @param  {Object} res - Respone object
 * @return {Number} Status code
 */
BookModel.addBook = (req, res) => {
  const reqBody = req.body;

  const newBook = new BookModel({
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

/**
 * Update an existing book
 * @param  {Object} req - Request object
 * @param  {[type]} res - Response object
 * @return {Number} Status code
 */
BookModel.updateBook = (req, res) => {
  const reqBody = req.body;
  const bookId = req.params.id;
  const condition = { _id: bookId };

  BookModel.findOneAndUpdate(condition, reqBody, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};


/**
 * Delete an existing book
 * @param  {Object} req - Request object
 * @param  {Object} res - Response object
 * @return {Number} Status code
 */
BookModel.deleteBook = (req, res) => {
  const bookId = req.params.id;
  const condition = { _id: bookId };

  BookModel.findOneAndRemove(condition, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = mongoose.model('Book', BookModel);
