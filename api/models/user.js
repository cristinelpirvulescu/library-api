const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const config = require('../config');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.set('secretToken', config.secret);

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
};


UserSchema.pre('save', generateHash);

UserSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      callback(err);
    }

    callback(null, isMatch);
  });
};

/**
 * Create an user
 * @param  {Object} req - Request object
 * @param  {Object} res - Response object
 * @return {Number} Status Code
 */
UserSchema.statics.createUser = function(req, res) {
  const reqBody = req.body;
  const newUser = new this({
    username: reqBody.username,
    password: reqBody.password,
  });

  // save user to database
  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};

/**
 * Authenticate an existing user
 * @param  {Object} req - Request object
 * @param  {Object} res - Response object
 * @return {Object} Success/failure response
 */
UserSchema.statics.authenticateUser = function(req, res) {
  const reqBody = req.body;
  const passwordClear = reqBody.password;

  // find the test user
  this.findOne({ username: reqBody.username }, (err, user) => {
    if (err) {
      return res.sendStatus(500);
    }

    if (!user) {
      return res.json({
        success: false,
        message: 'Authentication failed. User not found.',
      });
    }

    // check passwords matching
    bcrypt.compare(passwordClear, user.password, (errCompare, resCompare) => {
      if (!resCompare) {
        return res.json({
          success: false,
          message: 'Authentication failed. Wrong password',
        });
      }

      // if user was found and the password is right create a token
      const token = jwt.sign(user, app.get('secretToken'), {
        expiresIn: 3600, // expires in 1h
      });

      return res.json({
        success: true,
        message: 'Token was created.',
        token: token,
      });
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
