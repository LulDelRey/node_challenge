require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Update authors tests', () => {
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

  // BUG: for some reason frisby is not sending the token, will write the tests anyway
  it('Can update an author detail successfully', async () => {
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
      .put(`${LOCAL_URL}/admin/authors/2`, {
        id: 2,
        name: 'Edu Ardo',
        email: 'eduedu@gmail.com',
        password: 'edu123',
        picture: 'algumatbm',
        role: 'CLIENT',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Author updated successfully');
        expect(payload.name).toBe('Edu Ardo');
        expect(payload.email).toBe('eduedu@gmail.com');
        expect(payload.password).toBe('edu123');
        expect(payload.algumatbm).toBe('algumatbm');
        expect(payload.role).toBe('CLIENT');
      });
  });

  it('Cannot update an author if not the author', async () => {
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
      .put(`${LOCAL_URL}/admin/authors/3`, {
        id: 2,
        name: 'Edu Ardo',
        email: 'eduedu@gmail.com',
        password: 'edu123',
        picture: 'algumatbm',
        role: 'CLIENT',
      })
      .expect('status', 403)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(messa).toBe('User not the author!');
      });
  });

  it('Cannot update an author without token', async () =>
    await frisby
      .put(`${LOCAL_URL}/admin/authors/2`, {
        id: 2,
        name: 'Edu Ardo',
        email: 'eduedu@gmail.com',
        password: 'edu123',
        picture: 'algumatbm',
        role: 'CLIENT',
      })
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Token not found!');
      }));

  it('Cannot update an author with wrong token', async () =>
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'token',
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${LOCAL_URL}/admin/authors/2`, {
        id: 2,
        name: 'Edu Ardo',
        email: 'eduedu@gmail.com',
        password: 'edu123',
        picture: 'algumatbm',
        role: 'CLIENT',
      })
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Invalid token!');
      }));

  it('Cannot update an author without name', async () => {
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
      .put(`${LOCAL_URL}/admin/authors/2`, {
        id: 2,
        email: 'eduedu@gmail.com',
        password: 'edu123',
        picture: 'algumatbm',
        role: 'CLIENT',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Name is missing!');
      });
  });

  it('Cannot update an author without email', async () => {
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
      .put(`${LOCAL_URL}/admin/authors/2`, {
        id: 2,
        name: 'Edu ardo',
        password: 'edu123',
        picture: 'algumatbm',
        role: 'CLIENT',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Email is missing!');
      });
  });

  it('Cannot update an author without password', async () => {
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
      .put(`${LOCAL_URL}/admin/authors/2`, {
        id: 2,
        name: 'Edu Ardo',
        email: 'eduedu@gmail.com',
        picture: 'algumatbm',
        role: 'CLIENT',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Password is missing!');
      });
  });
});
