const { Router } = require('express');
const authorsRoute = require('./authorsController');
const articlesRoute = require('./articlesController');

const adminRoute = Router({ mergeParams: true });

adminRoute.use('/authors', authorsRoute);
adminRoute.use('/articles', articlesRoute);

module.exports = adminRoute;
