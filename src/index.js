const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/ping', (_req, res) => res.send('pong!'));

app.listen(PORT || 3000, () => console.log('Listening...'));
