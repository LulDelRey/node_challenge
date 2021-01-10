const { Model } = require('objection');
const { Author } = require('../model/authorsModel');
const knex = require('../knex');

Model.knex(knex);

const createAuthorService = async (name, email, password, picture, role) => {
  // verify data
  // raise error message on wrong information
  // create author on db
  // end connection
  // return message and author created
};

const retrieveAuthors = async () => {
  const authors = await Author.query();
  await knex.destroy();
  return authors;
};

const retrieveAuthorById = async (id) => {
  // verify id
  const author = await Author.query().findById(id);
  await knex.destroy();
  return author;
};

const updateAuthorService = async (
  authorId,
  name,
  email,
  password,
  picture,
  role
) => {
  // verify data
  // raise error message on wrong information
  // update author on db
  // end connection
  // return message and author created
};

const deleteAuthorService = async (authorId) => {
  // verify if author is self or admin
  // raise error if not permission
  // find and delete author
  // return 204
};

module.exports = {
  createAuthorService,
  retrieveAuthors,
  retrieveAuthorById,
  updateAuthorService,
  deleteAuthorService,
};
