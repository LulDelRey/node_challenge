const jwt = require('jsonwebtoken');
const { Author } = require('../model/authorsModel');
const { validateEmail, validatePassword } = require('./validationServices');

const { SECRET } = process.env;
const generateToken = (data) => {
  const JWTCONFIG = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  console.log(data, SECRET, JWTCONFIG);
  const token = jwt.sign(data, SECRET, JWTCONFIG);
  return token;
};

const startSession = async (email, password) => {
  const validEmail = validateEmail(email);
  const validPassword = validatePassword(password);
  if (!validEmail.ok) return validEmail;
  if (!validPassword.ok) return validPassword;
  const user = await Author.query().where('email', email);
  if (user && user) {
    const { password, ...userData } = user[0];
    const token = generateToken(userData);
    return {
      ok: true,
      status: 200,
      message: 'User athenticated with success!',
      token,
    };
  }
  return {
    ok: false,
    status: 409,
    message: "User doesn't exists with this informarion!",
  };
};

module.exports = { startSession };
