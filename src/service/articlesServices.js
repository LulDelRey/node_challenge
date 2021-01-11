const { Model } = require('objection');
const { Article } = require('../model/articlesModel');
const {
  validateId,
  validateTitle,
  validateSummary,
  validateFirstParagraph,
  validateBody,
  validateCategory,
} = require('./validationServices');
const knex = require('../knex');

Model.knex(knex);

// TODO: delegate responsabilities to this function and make it smaller
const createArticleService = async (
  authorId,
  title = '',
  summary = '',
  first_paragraph = '',
  body = '',
  category = ''
) => {
  // verify data
  const validId = validateId(authorId);
  const validTitle = validateTitle(title);
  const validSummary = validateSummary(summary);
  const validParagraph = validateFirstParagraph(first_paragraph);
  const validBody = validateBody(body);
  const validCategory = validateCategory(category);
  // raise error message on wrong information
  switch (false) {
    case validId.ok:
      return validId;
    case validTitle.ok:
      return validTitle;
    case validSummary.ok:
      return validSummary;
    case validParagraph.ok:
      return validParagraph;
    case validBody.ok:
      return validBody;
    case validCategory.ok:
      return validCategory;
    default:
      break;
  }
  // create Article on db
  const createdArticle = await Article.query().insertAndFetch({
    authorId,
    title,
    summary,
    first_paragraph,
    body,
    category: category.toLowerCase(),
  });
  // return message and Article created
  return {
    ok: true,
    status: 201,
    message: 'Article created with success!',
    payload: createdArticle,
  };
};

const retrieveArticles = async () => {
  const Articles = await Article.query()
    .select(
      'aut.name',
      'aut.picture',
      'articles.category',
      'articles.title',
      'articles.summary',
      'articles.first_paragraph'
    )
    .innerJoin('authors as aut', 'articles.author_id', 'aut.id');

  return {
    ok: true,
    status: 200,
    message: 'Articles found!',
    payload: Articles,
  };
};

const retrieveArticleById = async (id) => {
  // verify id
  const validId = validateId(id);
  if (!validId.ok) return validId;
  const article = await Article.query()
    .findById(id)
    .innerJoin('authors as aut', 'articles.author_id', 'aut.id')
    .select(
      'aut.name',
      'aut.picture',
      'articles.category',
      'articles.title',
      'articles.summary',
      'articles.first_paragraph'
    );

  if (article) {
    return {
      ok: true,
      status: 200,
      message: 'Article found!',
      payload: article,
    };
  }
  return {
    ok: false,
    status: 404,
    message: 'No article found with this id!',
  };
};

const retriveSimpleArticles = async (category) => {
  if (!category) {
    const articles = await Article.query()
      .select(
        'aut.name',
        'aut.picture',
        'articles.category',
        'articles.title',
        'articles.summary',
        'articles.first_paragraph'
      )
      .innerJoin('authors as aut', 'articles.author_id', 'aut.id');

    return {
      ok: true,
      status: 200,
      message: 'Articles found!',
      payload: articles,
    };
  }
  const articles = await Article.query()
    .select(
      'aut.name',
      'aut.picture',
      'articles.category',
      'articles.title',
      'articles.summary',
      'articles.first_paragraph'
    )
    .innerJoin('authors as aut', 'articles.author_id', 'aut.id')
    .where('articles.category', category.toLowerCase());
  return {
    ok: true,
    status: 200,
    message: 'Articles found!',
    payload: articles,
  };
};

const retriveSimpleArticlesById = async (id) => {
  try {
    const articles = await Article.query()
      .select(
        'aut.name',
        'aut.picture',
        'articles.category',
        'articles.title',
        'articles.summary',
        'articles.first_paragraph'
      )
      .innerJoin('authors as aut', 'articles.author_id', 'aut.id')
      .where('articles.id', id);
    return {
      ok: true,
      status: 200,
      message: 'Article found!',
      payload: articles,
    };
  } catch (err) {
    return {
      ok: false,
      status: 404,
      message: 'Article not found!',
    };
  }
};

const updateArticleService = async (
  authorId,
  userRole,
  articleId,
  title,
  authorIdArt,
  summary,
  first_paragraph,
  body,
  category
) => {
  // verify data
  const validId = validateId(authorId);
  const validTitle = validateTitle(title);
  const validSummary = validateSummary(summary);
  const validParagraph = validateFirstParagraph(first_paragraph);
  const validBody = validateBody(body);
  const validCategory = validateCategory(category);
  // raise error message on wrong information
  switch (false) {
    case validId.ok:
      return validId;
    case validTitle.ok:
      return validTitle;
    case validSummary.ok:
      return validSummary;
    case validParagraph.ok:
      return validParagraph;
    case validBody.ok:
      return validBody;
    case validCategory.ok:
      return validCategory;
    case authorId !== authorIdArt && userRole !== 'ADMIN':
      return { ok: false, status: 403, message: 'User not the author!' };
    default:
      break;
  }
  // update Article on db
  const updatedArticle = await Article.query().updateAndFetchById(articleId, {
    title,
    authorIdArt,
    summary,
    first_paragraph,
    body,
    category,
  });
  // return message and Article created
  return {
    ok: true,
    status: 200,
    message: 'Article updated successfully',
    payload: updatedArticle,
  };
};

const deleteArticleService = async (userId, userRole, articleId) => {
  // verify if Article owner is the user or the user is admin
  const { author_id } = await Article.query().findById(articleId);
  if (author_id === userId || userRole === 'ADMIN') {
    // find and delete Article
    await Article.query().deleteById(articleId);
    // return 204
    return { ok: true, status: 204, message: 'Author deleted with success!' };
  }
  // raise error if not permission
  return { ok: false, status: 403, message: 'User not the Author!' };
};

module.exports = {
  createArticleService,
  deleteArticleService,
  retrieveArticles,
  retrieveArticleById,
  retriveSimpleArticles,
  retriveSimpleArticlesById,
  updateArticleService,
};
