const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.database);

module.exports = mongoose.model('Book', {
  ISBN: 'string',
  title: 'string',
  author: 'string',
  genre: 'string',
  year: 'number',
});
