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

  it('Can create an article with success', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.payload).toBeDefined();
        token = result.payload;
        console.log('LOGGED', LOCAL_URL);
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'Something',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${LOCAL_URL}/admin/articles`, {
        title: 'Test title',
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 201)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message)
      });
  });

  it('Cannot create an article without token', async () => {});

  it('Cannot create an article with wrong token', async () => {});

  it('Cannot create an article without category', async () => {});

  it('Cannot create an article without title', async () => {});

  it('Cannot create an article without summary', async () => {});

  it('Cannot create an article without first paragraph', async () => {});

  it('Cannot create an article without body', async () => {});
});
