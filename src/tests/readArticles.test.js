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

  afterAll(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run())
      .then(async () => knexInstance.destroy());
  });

  it('Can get all articles', async () => {
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
      .get(`${LOCAL_URL}/admin/articles`)
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Articles found!');
        expect(payload.length).toBe(3);
        expect(payload[0].title).toBe('Some performance tips');
        expect(payload[0].category).toBe('Performance');
        expect(payload[0].name).toBe('Luis');
      });
  });

  it('Cannot get articles without token', async () =>
    frisby
      .get(`${LOCAL_URL}/admin/articles`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Token not found!');
      }));

  it('Cannot get articles with invalid token', async () =>
    frisby
      .setup({
        request: {
          headers: {
            Authorization: 'Wrong token',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${LOCAL_URL}/admin/articles`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Invalid token!');
      }));

  it('Can get a specific article', async () => {
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
      .get(`${LOCAL_URL}/admin/articles/1`)
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Article found!');
        expect(payload.title).toBe('Some performance tips');
        expect(payload.name).toBe('Luis');
      });
  });

  it('Cannot get a nonexistent article', async () => {
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
      .get(`${LOCAL_URL}/admin/articles/10`)
      .expect('status', 404)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('No article found with this id!');
      });
  });

  it('Cannot get a specifc article without token', async () =>
    await frisby
      .get(`${LOCAL_URL}/admin/articles/1`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Token not found!');
      }));

  it('Cannot get a specific article with invalid token', async () =>
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'Some wrong token',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${LOCAL_URL}/admin/articles/1`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Invalid token!');
      }));
});
