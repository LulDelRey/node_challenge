const { Router } = require("express");
const { auth } = require("../middlewares");
const articlesRoute = Router({ mergeParams: true });

const createArticle = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
};

const getArticles = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
};

const updateArticle = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
};

const deleteArticle = (req, res) => {
  return res.status(200).json({ ok: 'ok' });
};

articlesRoute
  .route('/')
  .get(getArticles)
  .post(createArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = articlesRoute;
