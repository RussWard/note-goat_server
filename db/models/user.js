//const db = require('../dbConfig.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrtpt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true 
  },
  password: String
});

userSchema.pre('save', function(cb) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { cb(err) }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { cb(err) }
      user.password = hash;
      cb();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, result) => {
    if (err) { cb(err) }
    cb(null, result);
  });
};

module.exports = mongoose.model('user', userSchema);

