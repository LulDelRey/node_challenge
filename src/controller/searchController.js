const { Router } = require('express');
const {
  retriveSimpleArticles,
  retriveSimpleArticlesById,
} = require('../service/articlesServices');

const searchRoute = Router({ mergeParams: true });

const searchArticle = async (req, res, next) => {
  const { category } = req.query;
  const { ok, status, message, payload } = await retriveSimpleArticles(
    category
  );
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

const getArticleById = async (req, res, next) => {
  const { id } = req.params;
  const { ok, status, message, payload } = await retriveSimpleArticlesById(id);
  return ok
    ? res.status(status).json({ message, payload })
    : next({ status, message });
};

searchRoute.route('/').get(searchArticle);

searchRoute.route('/:id').get(getArticleById);

module.exports = searchRoute;
