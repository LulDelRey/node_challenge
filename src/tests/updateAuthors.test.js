require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Update authors tests', () => {
  // TODO: need to implement a coorect token to test correctly
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  it('Can update an author detail successfully', async () => {});

  it('Cannot update an author if not the author', async () => {});

  it('Cannot update an author without token', async () => {});

  it('Cannot update an author with wrong token', async () => {});

  it('Cannot update an author without name', async () => {});

  it('Cannot update an author without email', async () => {});

  it('Cannot update an author without password', async () => {});
});
