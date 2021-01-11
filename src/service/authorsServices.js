const { Model } = require('objection');
const { Author } = require('../model/authorsModel');
const {
  validateEmail,
  validateName,
  validatePassword,
  validateId,
} = require('./validationServices');
const knex = require('../knex');

Model.knex(knex);

const createAuthorService = async (
  name,
  email,
  password,
  picture,
  role = 'CLIENT'
) => {
  // verify data
  const validName = validateName(name);
  const validEmail = validateEmail(email);
  const validPass = validatePassword(password);
  let user;
  if (validEmail.ok) {
    user = await Author.query().where('email', email);
  }
  // raise error message on wrong information
  switch (false) {
    case validName.ok:
      return validName;
    case validEmail.ok:
      return validEmail;
    case validPass.ok:
      return validPass;
    case user.length === 0:
      return {
        ok: false,
        status: 409,
        message: 'User already exists with this info!',
      };
    default:
      break;
  }
  // create author on db
  const { password: userPass, ...author } = await Author.query().insertAndFetch(
    {
      name,
      email,
      password,
      picture,
      role,
    }
  );
  // return message and author created
  return {
    ok: true,
    status: 201,
    message: 'Author created with success!',
    payload: author,
  };
};

const retrieveAuthors = async () => {
  const authors = await Author.query();
  return { ok: true, status: 200, message: 'Authors found!', payload: authors };
};

const retrieveAuthorById = async (id) => {
  // verify id
  const validId = validateId(id);
  if (!validId.ok) return validId;
  const author = await Author.query().findById(id);
  if (author) {
    return { ok: true, status: 200, message: 'Author found!', payload: author };
  }
  return { ok: false, status: 404, message: 'No author found with this id!' };
};

const updateAuthorService = async (
  userId,
  userRole,
  authorId,
  name,
  email,
  password,
  picture,
  role
) => {
  // verify data
  const validId = validateId(authorId);
  const validName = validateName(name);
  const validEmail = validateEmail(email);
  const validPass = validatePassword(password);
  // raise error message on wrong information
  switch (false) {
    case validId.ok:
      return validId;
    case validName.ok:
      return validName;
    case validEmail.ok:
      return validName;
    case validPass.ok:
      return validName;
    case userId !== authorId && userRole !== 'ADMIN':
      return { ok: false, status: 403, message: 'User not the author!' };
    default:
      break;
  }
  // update author on db
  const updatedAuthor = await Author.query().updateAndFetchById(authorId, {
    name,
    email,
    password,
    picture,
    role,
  });
  // return message and author created
  return {
    ok: true,
    status: 200,
    message: 'Author updated successfully',
    payload: updatedAuthor,
  };
};

const deleteAuthorService = async (userId, userRole, authorId) => {
  // verify if author is self or admin
  if (userId === authorId || userRole === 'ADMIN') {
    // find and delete author
    await Author.query().deleteById(authorId);
    return { ok: true, status: 204, message: 'Author deleted with success!' };
  }
  // raise error if not permission
  return { ok: false, status: 403, message: 'User not the Author!' };
};

module.exports = {
  createAuthorService,
  deleteAuthorService,
  retrieveAuthors,
  retrieveAuthorById,
  updateAuthorService,
};
