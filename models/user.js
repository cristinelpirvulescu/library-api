const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: 'string',
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
