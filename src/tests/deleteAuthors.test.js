require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Delete authors tests', () => {
  // TODO: need to implement a coorect token to test correctly
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  it('Can delete author as admin', async () => {});

  it('Can delete author as author', async () => {});

  it('Cannot delete author without token', async () => {});

  it('Cannot delete author with wrong token', async () => {});

});
