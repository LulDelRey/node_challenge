require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Delete articles tests', () => {
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  it('Can delete article as admin', async () => {});

  it('Can delete article as author', async () => {});

  it('Cannot delete article without token', async () => {});

  it('Cannot delete article with wrong token', async () => {});
});
