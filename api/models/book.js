'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

mongoose.connect(config.database);

const BookSchema = new Schema({
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
BookSchema.statics.getBooks = function(req, res) {
  console.log(this);
  return this.find((err, books) => {
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
BookSchema.statics.addBook = function(req, res) {
  const reqBody = req.body;

  let newBook = new this({
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
BookSchema.statics.updateBook = function(req, res) {
  const reqBody = req.body;
  const bookId = req.params.id;
  const condition = { _id: bookId };

  this.findOneAndUpdate(condition, reqBody, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};


// /**
//  * Delete an existing book
//  * @param  {Object} req - Request object
//  * @param  {Object} res - Response object
//  * @return {Number} Status code
//  */
// BookModel.deleteBook = (req, res) => {
//   const bookId = req.params.id;
//   const condition = { _id: bookId };

//   BookModel.findOneAndRemove(condition, (err) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// };


module.exports = mongoose.model('Book', BookSchema);
