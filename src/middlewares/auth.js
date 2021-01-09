const jwt = require('jsonwebtoken');

const authenticate = (required) => async (req, _res, next) => {
  const { authorization: token } = req.headers;
  const { SECRET } = process.env;
  if (!required) return next();
  if (!token) {
    return next({ status: 401, message: 'Token not found!' });
  }
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    return next();
  } catch (err) {
    return next({ status: 401, message: 'Invalid token!' });
  }
};

module.exports = authenticate;
