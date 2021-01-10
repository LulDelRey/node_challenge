const { Router } = require('express');
const {
  createAuthorService,
  deleteAuthorService,
  retrieveAuthors,
  retrieveAuthorById,
  updateAuthorService,
} = require('../service/authorsServices');

const authorsRoute = Router({ mergeParams: true });

const createAuthor = async (req, res, next) => {
  const { name, email, password, picture, role } = req.body;
  const { ok, message, payload } = await createAuthorService(
    name,
    email,
    password,
    picture,
    role
  );
  return ok
    ? res.status(201).json({ message, payload })
    : next({ status: 422, message });
};

const getAuthors = async (_req, res) => {
  const authors = await retrieveAuthors();
  return res.status(200).json({ message: 'Authors found!', payload: authors });
};

const getAuthorById = async (req, res, next) => {
  const { id } = req.params;
  const { ok, message, payload } = await retrieveAuthorById(id);
  return ok
    ? res.status(200).json({ message, payload })
    : next({ status: 422, message });
};

const updateAuthor = async (req, res, next) => {
  const { id: userId, role: userRole } = req.user;
  const { id: authorId } = req.params;
  const { name, email, password, picture, role } = req.body;
  const { ok, message, payload } = await updateAuthorService(
    userId,
    userRole,
    authorId,
    name,
    email,
    password,
    picture,
    role
  );
  return ok
    ? res.status(200).json({ message, payload })
    : next({ status: 422, message });
};

const deleteAuthor = async (req, res) => {
  const { id: userId, role: userRole } = req.user;
  const { id: authorId } = req.params;
  const { ok, message } = await deleteAuthorService(userId, userRole, authorId);
  return ok
    ? res.status(204).json({ message })
    : next({ status: 403, message });
};

authorsRoute
  .route('/')
  .get(getAuthors)
  .post(createAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

authorsRoute.route('/:id').get(getAuthorById);

module.exports = authorsRoute;
