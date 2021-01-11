require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Read authors tests', () => {
  // TODO: need to implement a coorect token to test correctly
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  const testArr = [
    {
      name: 'Luis',
      email: 'luis@gmail.com',
      password: 'luis123',
      picture: 'alguma',
      role: 'ADMIN',
    },
    {
      name: 'Eduardo',
      email: 'eduedu@gmail.com',
      password: 'edu123',
      picture: 'algumatbm',
      role: 'CLIENT',
    },
    {
      name: 'Mari',
      email: 'mari@gmail.com',
      password: 'mari123',
      picture: 'outra',
      role: 'CLIENT',
    },
  ];
  const testAut = {
    name: 'Luis',
    email: 'luis@gmail.com',
    password: 'luis123',
    picture: 'alguma',
    role: 'ADMIN',
  };

  it('Can get all the authors', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeDefined();
        token = result.token;
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
        const result = JSON.parse(body);
        expect(result.payload).toEqual(testPayload);
      });
  });

  it('Cannot get all the authors without token', async () =>
    frisby
      .get(`${LOCAL_URL}/api/admin/authors`)
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
      .get(`${LOCAL_URL}/api/admin/authors`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid token!');
      }));

  it('Can get a specific author', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeUndefined();
        token = result.token;
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
      .get(`${LOCAL_URL}/api/admin/authors/1`)
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.payload).toEqual(testAut);
      });
  });

  it('Cannot get a nonexistent author', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeUndefined();
        token = result.token;
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
      .get(`${LOCAL_URL}/api/admin/authors/12312`)
      .expect('status', 404)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Author not found!');
      });
  });

  it('Cannot get a specifc author without token', async () =>
    frisby
      .get(`${LOCAL_URL}/api/admin/authors/1`)
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
      .post(`${LOCAL_URL}/api/admin/authors/1`)
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid token!');
      }));
});
