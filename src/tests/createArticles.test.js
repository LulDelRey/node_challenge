require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Create articles tests', () => {
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run())
      .then(async () => knexInstance.destroy());
  });

  it('Can create an article with success', async () => {});

  it('Cannot create an article without token', async () => {});

  it('Cannot create an article with wrong token', async () => {});

  it('Cannot create an article without category', async () => {});

  it('Cannot create an article without title', async () => {});

  it('Cannot create an article without summary', async () => {});

  it('Cannot create an article without first paragraph', async () => {});

  it('Cannot create an article without body', async () => {});
});
