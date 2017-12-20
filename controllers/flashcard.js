const User = require('../db/models').User;
const uuidv1 = require('uuid/v1');

module.exports.insert = (req, res) => {
  let flashcard = {
    word: req.body.word,
    type: req.body.type,
    def: req.body.def,
    tags: req.body.tags
  };

  User.findOneAndUpdate(
    { email: req.user.email }, 
    { $push: { flashcards: flashcard } } 
  )
  .then(() => {
    res.status(200).send({ message: 'flashcard inserted' });
  })
  .catch((err) => {
    res.status(500).send(err)
  }) 
};

module.exports.getAll = (req, res) => {
  res.status(200).send(req.user.flashcards)
};

module.exports.deleteOne = (req, res) => {
  req.user.flashcards.id(req.body.id).remove()
    .then(() => {
      req.user.save()
      .then(() => {
        res.status(200).send({ message: 'flashcard deleted' });
      })
      .catch(err => {
        res.status(500).send(err);
      })
    })
    .catch((err) => {
      res.status(500).send(err);
    })
};