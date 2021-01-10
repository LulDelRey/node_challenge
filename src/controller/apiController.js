const { Router } = require('express');
const { auth } = require('../middlewares');
const loginRoute = require('./loginController');
const signUpRoute = require('./signUpController');
const authorsRoute = require('./authorsController');
const articlesRoute = require('./articlesController');
const searchRoute = require('./searchController');

const apiRoute = Router({ mergeParams: true });

apiRoute.use('/login', auth(), loginRoute);
apiRoute.use('/sign-up', auth(), signUpRoute);
apiRoute.use('/admin/authors', auth(), authorsRoute);
apiRoute.use('/admin/articles', auth(true), articlesRoute);
apiRoute.use('/articles', auth(), searchRoute);

module.exports = apiRoute;
