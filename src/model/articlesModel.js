const { Model } = require('objection');

class Article extends Model {
  static get tableName() {
    return 'articles';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = { Article };
