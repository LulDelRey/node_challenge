const { Model } = require('objection');

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get idColumn() {
    return 'id';
  }
}

module.exports = { Author };
