require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');

const { errorHandler } = require('./middlewares');
const apiRoute = require('./controller/apiController');
const { PORT } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoute);

app.use(errorHandler);

app.listen(PORT, () => console.log('Listening...'));
