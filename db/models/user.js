
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const flashcardSchema = require('./flashcard');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true 
  },
  password: { type: String, required: true },
  flashcards: [flashcardSchema]
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

