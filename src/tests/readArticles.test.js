require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Read articles tests', () => {
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  it('Can get all articles', async () => {});

  it('Cannot get articles without token', async () => {});

  it('Cannot get articles with invalid token', async () => {});

  it('Can get a specific article', async () => {});

  it('Cannot get a nonexistent article', async () => {});

  it('Cannot get a specifc article without token', async () => {});

  it('Cannot get a specific article with invalid token', async () => {});
});
