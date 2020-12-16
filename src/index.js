require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const { auth, errorHandler } = require('./middlewares');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/ping', auth(true), (_req, res) => res.send('pong!'));

app.use(errorHandler)

app.listen(process.env.PORT, () => console.log('Listening...'));

/**
 * login: /api/login
 * sign up: /api/sign-up
 * CRUD /api/admin/authors
 * CRUD /api/admin/articles
 * List article endpoint
 * /api/articles?category=:slug
 * /api/articles/:id
 */