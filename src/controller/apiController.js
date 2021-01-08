const { Router } = require('express');
const { auth } = require('../middlewares');
const loginRoute = require('./loginController');
const signUpRoute = require('./signUpController');
const adminRoute = require('./adminController');
const searchRoute = require('./searchController');

const apiRoute = Router({ mergeParams: true });

apiRoute.use('/login', loginRoute);
apiRoute.use('/sign-up', signUpRoute);
apiRoute.use('/admin', auth(true), adminRoute);
apiRoute.use('/articles', searchRoute);

module.exports = apiRoute;

