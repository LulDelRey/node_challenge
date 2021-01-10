const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const generateToken = ({ dataValues }) => {
  const { password, ...data } = dataValues;
  const SECRET = SECRET;
  const JWTCONFIG = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const token = jwt.sign(data, SECRET, JWTCONFIG);
  return token;
};

const validateName = (name) =>
  !name
    ? {
        ok: false,
        message: 'Name is missing!',
      }
    : { ok: true };

const validateEmail = async (email) => {
  if (!email) return { ok: false, status: 400, message: 'Email is missing!' };
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ? { ok: true }
    : {
        ok: false,
        message: 'Email is not in the correct format!',
      };
};

const validatePassword = (pass) =>
  !pass ? { ok: false, message: 'Password is missing!' } : { ok: true };

const validateId = (id) =>
  isNaN(id) ? { ok: false, message: 'Not a valid id!' } : { ok: true };

module.exports = {
  generateToken,
  validateName,
  validateEmail,
  validatePassword,
  validateId,
};
