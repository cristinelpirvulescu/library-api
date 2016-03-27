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
  mongoose.model('Book', BookSchema).find((err, books) => {
    if (err) {
      return res.send(err);
    }

    return res.json(books);
  });
};

module.exports = mongoose.model('Book', BookSchema);

// module.exports = mongoose.model('Book', {
//   ISBN: 'string',
//   title: 'string',
//   author: 'string',
//   genre: 'string',
//   year: 'number',
// });
