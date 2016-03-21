const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {
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

function generateHash(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      next(err);
    }

    // hash the password with the new salt
    bcrypt.hash(this.password, salt, (err2, hash) => {
      if (err) {
        next();
      }

      // override the clear_text password with the hashed one
      this.password = hash;
      next();
    });
  });
}

UserSchema.pre('save', generateHash);

UserSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      callback(err);
    }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
