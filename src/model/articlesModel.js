const { Model } = require('objection');

class Article extends Model {
  static get tableName() {
    return 'Articles';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = { Article };
