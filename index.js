const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router.js');
const db = require('./db/dbConfig.js');
const app = express();

const PORT = process.env.PORT || 3090;
const IP = process.env.IP || 'localhost';

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(router);

app.listen(PORT, () => {
  console.log('app is listening on ', PORT);
})