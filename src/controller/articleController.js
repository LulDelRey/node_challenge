const { Router } = require("express");
const auth = require("../middlewares");

const articleRoute = Router();

const createArticle = (req, res) => {};

const getArticles = (req, res) => {};

const updateArticle = (req, res) => {};

const deleteArticle = (req, res) => {};

articleRoute
  .route('/')
  .get(auth(true), getArticles())
  .post(auth(true), createArticle())
  .put(auth(true), updateArticle())
  .delete(auth(true), deleteArticle());
