require('dotenv').config();
const dictionary = require('mw-dict').CollegiateDictionary;
const uuidv1 = require('uuid/v1');
const dict = new dictionary(process.env.WEBSTER_KEY);

module.exports = (req, res) => {
  dict.lookup(req.query.word)
    .then(data => {
      let defs = data[0].definition[0].senses || data[0].definition;
      let websterDef = {};
      websterDef.defArray = defs.map(def => {
        if (def.senses) {
          return {
            word: data[0].word,
            definition: def.senses[0].meanings[0].slice(1) || '',
            id: uuidv1()
          }
        }
        if (def.meanings) {
          return {
            word: data[0].word,
            definition: def.meanings[0].slice(1),
            id: uuidv1()
          } 
        }
      })
      websterDef.type = data[0].functional_label;
      websterDef.word = data[0].word;
      return websterDef;
    })
    .then(websterDef => {
      res.status(200).send(websterDef);
    })
    .catch(err => {
      res.status(404).send(err);
    })
}
