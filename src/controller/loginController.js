const { Router } = require('express');
const auth = require('../middlewares/auth');

const loginRoute = Router({ mergeParams: true });

const login = async (req, res) => {
  const { email, password } = req.body;
  return res.status(201).json({ email, password });
};

loginRoute.route('/').post(auth(false), login);

module.exports = loginRoute;
