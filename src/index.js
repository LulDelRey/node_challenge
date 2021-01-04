require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = process.env;
const { auth, errorHandler } = require('./middlewares');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/ping', auth(true), (_req, res) => res.send('pong!'));

app.use(errorHandler)

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