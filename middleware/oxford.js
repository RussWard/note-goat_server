require('dotenv').config();
const Dictionary = require('oxford-dictionary-api');
const app_id = process.env.OXFORD_ID;
const app_key = process.env.OXFORD_KEY;

const dict = new Dictionary(app_id, app_key);

module.exports = (req, res) => {
  dict.find(req.query.word, (err, data) => {
    if (err) {
      console.log('Error in middleware ', err);
      res.send(404, err);
    } else {
      let defs = data.results[0].lexicalEntries[0].entries[0].senses || [];
      data.defArray = defs.map(sense=> {
        let definition;
        if (sense.definitions) {
          definition = sense.definitions[0]
        } else if (data.results[0].lexicalEntries[0].entries[0].etymologies[0]) {
          definition = data.results[0].lexicalEntries[0].entries[0].etymologies[0];
        }
        if (sense) {
          return {
            word: req.query.word,
            definition: definition,
            id: sense.id,
          };
        }
      });
      data.type = data.results[0].lexicalEntries[0].lexicalCategory;
      data.word = req.query.word;
      res.status(200).send(data);
    }
  }); 
}