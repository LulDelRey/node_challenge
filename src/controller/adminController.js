const { Router } = require('express');
const { auth } = require('../middlewares');
const authorsRoute = require('./authorsController');
const articlesRoute = require('./articlesController');

const adminRoute = Router({ mergeParams: true });

adminRoute.use('/authors', auth(true), authorsRoute);
adminRoute.use('/articles', auth(true), articlesRoute);

module.exports = adminRoute;
