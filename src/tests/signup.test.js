require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Sign up tests', () => {
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  it('Can create an account with success', async () =>
    frisby
      .post(`${LOCAL_URL}/api/sign-up`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe(
          'User created with success! You can now login.'
        );
      }));

  it('Cannot create a user without name', async () =>
    frisby
      .post(`${LOCAL_URL}/api/sign-up`, {
        name: '',
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing name!');
      }));

  it('Cannot create a user without email', async () =>
    frisby
      .post(`${LOCAL_URL}/api/sign-up`, {
        name: 'Meu nome',
        email: '',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing email!');
      }));

  it('Cannot create a user with wrong email', async () =>
    frisby
      .post(`${LOCAL_URL}/api/sign-up`, {
        name: 'Meu nome',
        email: 'meuemail.gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email is not in the correct format!');
      }));

  it('Cannot create a user with wrong email too', async () =>
    frisby
      .post(`${LOCAL_URL}/api/sign-up`, {
        name: 'Meu nome',
        email: 'meuemailgmailcom',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email is not in the correct format!');
      }));

  it('Cannot create a user without password', async () =>
    frisby
      .post(`${LOCAL_URL}/api/sign-up`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: '',
        picture: 'Alguma picture ae',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing password!');
      }));

  it('Cannot create a user with small password', async () =>
    frisby
      .post(`${LOCAL_URL}/api/sign-up`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        password: '1',
        picture: 'Alguma picture ae',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Password is too small!');
      }));
});
