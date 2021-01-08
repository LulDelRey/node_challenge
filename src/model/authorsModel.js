const { Model } = require('objection');

authors = [
  {
    name: 'Luis',
    email: 'luis@gmail.com',
    password: 'luis123',
    picture: 'alguma',
    role: 'ADM',
  },
  {
    name: 'Eduardo',
    email: 'eduedu@gmail.com',
    password: 'edu123',
    picture: 'algumatbm',
    role: 'AUT',
  },
  {
    name: 'Mari',
    email: 'mari@gmail.com',
    password: 'mari123',
    picture: 'outra',
    role: 'aut',
  },
];

class AuthorsModel extends Model {
  static get tableName() {
    return 'authors';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: 'name',
      properties: {

      },
    };
  }
};

module.exports = AuthorsModel;
