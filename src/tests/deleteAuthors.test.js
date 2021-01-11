require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Delete authors tests', () => {
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

  it('Can delete author as admin', async () => {
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
        expect(result.message).toBe('User athenticated with success!');
        expect(result.payload).toBeDefined();
        token = result.payload;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .del(`${LOCAL_URL}/admin/authors/3`)
      .expect('status', 204);

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${LOCAL_URL}/admin/authors/3`)
      .expect('status', 404);
  });

  it('Can delete author as author', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'eduedu@gmail.com',
        password: 'edu123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('User athenticated with success!');
        expect(result.payload).toBeDefined();
        token = result.payload;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .del(`${LOCAL_URL}/admin/authors/2`)
      .expect('status', 204);
  });

  it('Cannot delete author as other author', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'mari@gmail.com',
        password: 'mari123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('User athenticated with success!');
        expect(result.payload).toBeDefined();
        token = result.payload;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .del(`${LOCAL_URL}/admin/authors/2`)
      .expect('status', 403)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('User not the Author!');
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${LOCAL_URL}/admin/authors/2`)
      .expect('status', 200);
  });

  it('Cannot delete author without token', async () =>
    frisby
      .del(`${LOCAL_URL}/admin/authors/3`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Token not found!');
      }));

  it('Cannot delete author with wrong token', async () =>
    frisby
      .setup({
        request: {
          headers: {
            Authorization: 'some wrong token',
            'Content-Type': 'application/json',
          },
        },
      })
      .del(`${LOCAL_URL}/admin/authors/3`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid token!');
      }));
});
