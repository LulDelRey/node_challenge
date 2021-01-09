const { Router } = require("express");

const searchRoute = Router({ mergeParams: true });

const searchArticle = async (req, res) => {
  const { category } = req.query;
  return res.status(200).json({ category });
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  return res.status(200).json({ id });
};

searchRoute
  .route('/')
  .get(searchArticle);

searchRoute
  .route('/:id')
  .get(getArticleById);

module.exports = searchRoute;
