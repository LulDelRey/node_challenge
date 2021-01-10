const { Router } = require('express');
const { retrieveAuthors } = require('../service/authorsServices');

const authorsRoute = Router({ mergeParams: true });

const createAuthor = (req, res) => {
  const { name, email, password, picture, role } = req.body;
  return res.status(200).json({ ok: 'ok' });
};

const getAuthors = async (_req, res) => {
  const authors = await retrieveAuthors();
  return res.status(200).json({ status: 200, payload: authors });
};

const getAuthorById = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
};

const updateAuthor = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
};

const deleteAuthor = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
};

authorsRoute
  .route('/')
  .get(getAuthors)
  .post(createAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

authorsRoute.route('/:id').get(getAuthorById);

module.exports = authorsRoute;
