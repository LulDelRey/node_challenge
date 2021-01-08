const { Router } = require('express');
const loginRoute = require('./loginController');
const signUpRoute = require('./signUpController');
const adminRoute = require('./adminController');

const apiRoute = Router({ mergeParams: true });

apiRoute.use('/login', loginRoute);
apiRoute.use('/sign-up', signUpRoute);
apiRoute.use('/admin', adminRoute);
// apiRoute.use('/articles?category=:slug', articlesRoute);
// apiRoute.use('/articles/:id', articlesRoute);

module.exports = apiRoute;

