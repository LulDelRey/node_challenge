require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

const { errorHandler } = require('./middlewares');
const apiRoute = require('./controller/apiRoutes');
const { PORT } = process.env;

const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoute);

app.use(errorHandler);

app.listen(PORT, () => console.log('Listening...'));
