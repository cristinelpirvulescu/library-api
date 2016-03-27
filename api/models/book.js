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

module.exports = mongoose.model('Book', BookModel);
