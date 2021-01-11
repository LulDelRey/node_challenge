require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Update articles tests', () => {
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  it('Can update and article with success', async () => {});

  it('Cannot update an article if not the author', async () => {});

  it('Cannot update an article without token', async () => {});

  it('Cannot update an article with wrong token', async () => {});

  it('Cannot update an article without category', async () => {});

  it('Cannot update an article without title', async () => {});

  it('Cannot update an article without summary', async () => {});

  it('Cannot update an article without first paragraph', async () => {});

  it('Cannot update an article without body', async () => {});
});