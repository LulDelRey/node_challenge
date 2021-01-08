const { Router } = require('express');
const { sign } = require('jsonwebtoken');
const { auth } = require('../middlewares');

const authorsRoute = Router({mergeParams: true});

authorsRoute.route('/s').post(auth(false));

module.exports = authorsRoute;
