const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.database);

module.exports = mongoose.model('User', {
  name: 'string',
  password: 'string',
});
