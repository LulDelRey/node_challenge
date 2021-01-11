const { Router } = require('express');
const { startSession } = require('../service/sessionService');

const loginRoute = Router({ mergeParams: true });

const login = async (req, res) => {
  const { email, password } = req.body;
  const { ok, status, message, payload } = await startSession(email, password);
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

loginRoute.route('/').post(login);

module.exports = loginRoute;
