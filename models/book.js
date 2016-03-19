const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library_db');

module.exports = mongoose.model('Book', {
  ISBN: 'string',
  title: 'string',
  author: 'string',
  genre: 'string',
  year: 'number',
});
