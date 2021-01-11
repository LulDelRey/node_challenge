require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Read authors tests', () => {
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

  it('Can get all the authors', async () => {
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
      .get(`${LOCAL_URL}/admin/authors`)
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Authors found!');
        expect(payload.length).toBe(3);
        expect(payload[0].id).toBe(1);
        expect(payload[0].name).toBe('Luis');
        expect(payload[0].role).toBe('ADMIN');
      });
  });

  it('Cannot get all the authors without token', async () =>
    frisby
      .get(`${LOCAL_URL}/admin/authors`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Token not found!');
      }));

  it('Cannot get all the authors with invalid token', async () =>
    frisby
      .setup({
        request: {
          headers: {
            Authorization: 'some wrong token',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${LOCAL_URL}/admin/authors`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid token!');
      }));

  it('Can get a specific author', async () => {
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
      .get(`${LOCAL_URL}/admin/authors/1`)
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Author found!');
        expect(payload.id).toBe(1);
        expect(payload.name).toBe('Luis');
        expect(payload.role).toBe('ADMIN');
      });
  });

  it('Cannot get a nonexistent author', async () => {
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
      .get(`${LOCAL_URL}/admin/authors/12312`)
      .expect('status', 404)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('No author found with this id!');
      });
  });

  it('Cannot get a specifc author without token', async () =>
    frisby
      .get(`${LOCAL_URL}/admin/authors/1`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Token not found!');
      }));

  it('Cannot get a specific author with invalid token', async () =>
    frisby
      .setup({
        request: {
          headers: {
            Authorization: 'some wrong token',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${LOCAL_URL}/admin/authors/1`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid token!');
      }));
});
