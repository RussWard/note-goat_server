const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
  word: { type: String, required: true },
  type: String,
  def: { type: String, required: true },
  tags: []
});

module.exports = flashcardSchema;