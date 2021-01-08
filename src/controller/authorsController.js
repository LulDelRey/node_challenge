const { Router } = require('express');

const authorsRoute = Router({ mergeParams: true });

const createAuthor = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
};

const getAuthors = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
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
