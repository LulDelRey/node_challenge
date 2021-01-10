const { Model } = require('objection');
const { Article } = require('../model/articlesModel');
const knex = require('../knex');

Model.knex(knex);

const createArticleService = async (
  authorId,
  title,
  summary,
  firstParagraph,
  body,
  categories
) => {
  // verify data
  // raise error message on wrong information
  // create Article on db
  // end connection
  // return message and Article created
};

const retrieveArticles = async () => {
  const Articles = await Article.query();
  await knex.destroy();
  return Articles;
};

const retrieveArticleById = async (id) => {
  // verify id
  const Article = await Article.query().findById(id);
  await knex.destroy();
  return Article;
};

const updateArticleService = async (
  articleId,
  authorId,
  title,
  summary,
  firstParagraph,
  body,
  categories
) => {
  // verify data
  // raise error message on wrong information
  // update Article on db
  // end connection
  // return message and Article created
};

const deleteArticleService = async (articleId) => {
  // verify if Article is self or admin
  // raise error if not permission
  // find and delete Article
  // return 204
};

module.exports = {
  createArticleService,
  retrieveArticles,
  retrieveArticleById,
  updateArticleService,
  deleteArticleService,
};
