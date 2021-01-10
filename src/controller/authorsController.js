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
  const { ok, status, message, payload } = await createAuthorService(
    name,
    email,
    password,
    picture,
    role
  );
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

const getAuthors = async (_req, res) => {
  const { status, message, payload } = await retrieveAuthors();
  return res.status(status).json({ message, payload });
};

const getAuthorById = async (req, res, next) => {
  const { id } = req.params;
  const { ok, status, message, payload } = await retrieveAuthorById(id);
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

const updateAuthor = async (req, res, next) => {
  const { id: userId, role: userRole } = req.user;
  const { id: authorId } = req.params;
  const { name, email, password, picture, role } = req.body;
  const { ok, status, message, payload } = await updateAuthorService(
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
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

const deleteAuthor = async (req, res) => {
  const { id: userId, role: userRole } = req.user;
  const { id: authorId } = req.params;
  const { ok, status, message } = await deleteAuthorService(
    userId,
    userRole,
    authorId
  );
  return ok ? res.status(status).json({ message }) : next({ status, message });
};

authorsRoute
  .route('/')
  .get(getAuthors)
  .post(createAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

authorsRoute.route('/:id').get(getAuthorById);

module.exports = authorsRoute;
