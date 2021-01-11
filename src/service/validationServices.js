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
        status: 422,
        message: 'Name is missing!',
      }
    : { ok: true };

const validateEmail = async (email) => {
  if (!email) return { ok: false, status: 400, message: 'Email is missing!' };
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ? { ok: true }
    : {
        ok: false,
        status: 422,
        message: 'Email is not in the correct format!',
      };
};

const validatePassword = (pass) =>
  !pass
    ? { ok: false, status: 422, message: 'Password is missing!' }
    : { ok: true };

const validateId = (id) =>
  isNaN(id)
    ? { ok: false, status: 422, message: 'Not a valid id!' }
    : { ok: true };

const validateTitle = (title) =>
  !title
    ? { ok: false, status: 422, message: 'Title cannot be empty!' }
    : { ok: true };

const validateSummary = (summary) =>
  !summary
    ? { ok: false, status: 422, message: 'Summary cannot be empty!' }
    : { ok: true };

const validateFirstParagraph = (firstParagraph) =>
  !firstParagraph
    ? { ok: false, status: 422, message: 'First paragraph cannot be empty!' }
    : { ok: true };

const validateBody = (body) =>
  !body
    ? { ok: false, status: 422, message: 'Body cannot be empty!' }
    : { ok: true };

const validateCategory = (category) =>
  !category
    ? { ok: false, status: 422, message: 'Category cannot be empty!' }
    : { ok: true };

module.exports = {
  generateToken,
  validateName,
  validateEmail,
  validatePassword,
  validateId,
  validateTitle,
  validateSummary,
  validateFirstParagraph,
  validateBody,
  validateCategory,
};
