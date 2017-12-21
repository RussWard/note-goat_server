
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
bcrypt.Promise = global.Promise;
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
  // bcrypt.genSalt(10, (err, salt) => {
  //   if (err) { cb(err) }
  //   bcrypt.hash(user.password, salt, null, (err, hash) => {
  //     if (err) { cb(err) }
  //     user.password = hash;
  //     cb();
  //   });
  // });
  bcrypt.genSalt(10)
    .then((salt) => {
      return bcrypt.hash(user.password, salt)
    })
    .then((hash) => {
      user.password = hash;
      cb();
    })
    .catch(err => {
      cb(err);
    })
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
    // .then((result) => {
    //   return cb(null, result);
    // })
    // .catch((err) => {
    //   return cb(err);
    // })
};

module.exports = mongoose.model('user', userSchema);

