require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Create authors tests', () => {
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

  it('Can create an author with success', async () => {
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
      .post(`${LOCAL_URL}/admin/authors`, {
        name: 'Outro lul',
        email: 'lul2@gmail.com',
        password: 'luls2123',
        picture: 'Some picture',
        role: 'CLIENT',
      })
      .expect('status', 201)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Author created with success!');
        expect(payload.id).toBe(4);
        expect(payload.name).toBe('Outro lul');
        expect(payload.email).toBe('lul2@gmail.com');
        expect(payload.password).toBeUndefined();
      });
  });

  it('Cannot create an author without token', async () =>
    frisby
      .post(`${LOCAL_URL}/admin/authors`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Token not found!');
      }));

  it('Cannot create an author with wrong token', async () =>
    frisby
      .setup({
        request: {
          headers: {
            Authorization: 'eum eum',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${LOCAL_URL}/admin/authors`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid token!');
      }));

  it('Cannot create a user without name', async () => {
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
      .post(`${LOCAL_URL}/admin/authors`, {
        email: 'lul2@gmail.com',
        password: 'luls2123',
        picture: 'Some picture',
        role: 'CLIENT',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Name is missing!');
      });
  });

  it('Cannot create a user without email', async () => {
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
      .post(`${LOCAL_URL}/admin/authors`, {
        name: 'Outro lul',
        password: 'luls2123',
        picture: 'Some picture',
        role: 'CLIENT',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Email is missing!');
      });
  });

  it('Cannot create a user with wrong email', async () => {
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
      .post(`${LOCAL_URL}/admin/authors`, {
        name: 'Outro lul',
        email: 'lul2.gmail.com',
        password: 'luls2123',
        picture: 'Some picture',
        role: 'CLIENT',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Email is not in the correct format!');
      });
  });

  it('Cannot create a user with wrong email too', async () => {
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
      .post(`${LOCAL_URL}/admin/authors`, {
        name: 'Outro lul',
        email: 'lul2r4gmail.com',
        password: 'luls2123',
        picture: 'Some picture',
        role: 'CLIENT',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Email is not in the correct format!');
      });
  });

  it('Cannot create a user without password', async () => {
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
      .post(`${LOCAL_URL}/admin/authors`, {
        name: 'Outro lul',
        email: 'lul2@gmail.com',
        picture: 'Some picture',
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
