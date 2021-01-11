const { Router } = require('express');
const {
  createArticleService,
  deleteArticleService,
  retrieveArticles,
  retrieveArticleById,
  updateArticleService,
} = require('../service/articlesServices');

const articlesRoute = Router({ mergeParams: true });

const createArticle = async (req, res, next) => {
  const { id: authorId } = req.user;
  const { title, summary, first_paragraph, body, category } = req.body;
  const { ok, message, payload } = await createArticleService(
    authorId,
    title,
    summary,
    first_paragraph,
    body,
    category
  );
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

const getArticles = async (_req, res) => {
  const { status, message, payload } = await retrieveArticles();
  return res.status(status).json({ message, payload });
};

const getArticleById = async (req, res, next) => {
  const { id } = req.params;
  const { ok, status, message, payload } = await retrieveArticleById(id);
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

const updateArticle = async (req, res, next) => {
  const { id: authorId, role: userRole } = req.user;
  const { id: articleId } = req.params;
  const {
    title,
    authorIdArt,
    summary,
    first_paragraph,
    body,
    category,
  } = req.body;
  const { ok, status, message, payload } = await updateArticleService(
    authorId,
    userRole,
    articleId,
    title,
    authorIdArt,
    summary,
    first_paragraph,
    body,
    category
  );
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

const deleteArticle = async (req, res, next) => {
  const { id: userId, role: userRole } = req.user;
  const { id: articleId } = req.params;
  const { ok, status, message } = await deleteArticleService(
    userId,
    userRole,
    articleId
  );
  return ok ? res.status(status).json({ message }) : next({ status, message });
};

articlesRoute.route('/').get(getArticles).post(createArticle);

articlesRoute
  .route('/:id')
  .get(getArticleById)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = articlesRoute;
