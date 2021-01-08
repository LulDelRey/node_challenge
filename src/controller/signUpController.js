const { Router } = require('express');
const auth = require('../middlewares/auth');

const signUpRoute = Router({ mergeParams: true });

const signUp = (req, res) => {
  const { name, email, password, picture } = req.body;
  // const { status, message } = signUpFunc(name, email, password, picture);
  return res.status(200).json({ name, email, password, picture });
};

signUpRoute.route('/').post(auth(false), signUp);

module.exports = signUpRoute;
