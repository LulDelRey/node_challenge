require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Create authors tests', () => {
  // TODO: need to implement a coorect token to test correctly
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  it('Can create an account with success', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeUndefined();
        expect(result.message).toBe('Loged with success!');
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe(
          'User created with success! You can now login.'
        );
      });
  });

  it('Cannot create an author without token', async () =>
    frisby
      .post(`${LOCAL_URL}/api/admin/authors`, {
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
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
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeUndefined();
        expect(result.message).toBe('Loged with success!');
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
        name: '',
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing name!');
      });
  });

  it('Cannot create a user without email', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).toBeUndefined();
        expect(result.message).toBe('Loged with success!');
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
        name: 'Meu nome',
        email: '',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing email!');
      });
  });

  it('Cannot create a user with wrong email', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeUndefined();
        expect(result.message).toBe('Loged with success!');
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
        name: 'Meu nome',
        email: 'meuemail.gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email is not in the correct format!');
      });
  });

  it('Cannot create a user with wrong email too', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeUndefined();
        expect(result.message).toBe('Loged with success!');
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
        name: 'Meu nome',
        email: 'meuemailgmailcom',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email is not in the correct format!');
      });
  });

  it('Cannot create a user without password', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeUndefined();
        expect(result.message).toBe('Loged with success!');
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: '',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing password!');
      });
  });

  it('Cannot create a user with small password', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeUndefined();
        expect(result.message).toBe('Loged with success!');
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: '1',
        picture: 'Alguma picture ae',
        role: 'AUT',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Password is too small!');
      });
  });

  it('Cannot create user without role', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.token).not.toBeDefined();
        expect(result.message).toBe('Loged with success!');
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
      .post(`${LOCAL_URL}/api/admin/authors`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: '1',
        picture: 'Alguma picture ae',
        role: '',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing role!');
      });
  });
});