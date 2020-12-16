const { Router } = require('express');
const auth = require('../middlewares');

const apiRoute = Router();

apiRoute.route('/')
