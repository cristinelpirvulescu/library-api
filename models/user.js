const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

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

UserSchema.pre('save', function(next) {
  const user = this;
  console.log('pre-save');
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    console.log('new-pass');
    next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      console.log('err-genSalt');
      // next(err);
    }

    // hash the password with the new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        console.log('err-hash-pass');
        // next();
      }

      // override the clear_text password with the hashed one
      user.password = hash;
      console.log(user.password);
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      console.log('cb-err');
      callback(err);
    }

    console.log('compare');
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
