require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');

const { errorHandler } = require('./middlewares');
const apiRoute = require('./controller/apiController');
const { PORT } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoute)

app.use(errorHandler);

app.listen(PORT, () => console.log('Listening...'));

/**
 * login: /api/login
 * sign up: /api/sign-up
 *
 * Create /api/admin/authors
 * Read /api/admin/authors
 * Update /api/admin/authors
 * Delete /api/admin/authors
 *
 * Create /api/admin/articles
 * Read /api/admin/articles
 * Update /api/admin/articles
 * Delete /api/admin/articles
 *
 * List article endpoint
 * /api/articles?category=:slug
 * /api/articles/:id
 */
