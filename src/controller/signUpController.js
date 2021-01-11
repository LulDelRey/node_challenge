const { Router } = require('express');
const { createAuthorService } = require('../service/authorsServices');

const signUpRoute = Router({ mergeParams: true });

const signUp = (req, res, next) => {
  const { name, email, password, picture } = req.body;
  const { ok, status, message, payload } = createAuthorService(
    name,
    email,
    password,
    picture
  );
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

signUpRoute.route('/').post(signUp);

module.exports = signUpRoute;
