require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Sign up tests', () => {
  const newUser = {
    name: 'Meu nome',
    email: 'meuemail@gmail.com',
    password: 'P@ssw0rd',
    picture: 'Alguma picture ae',
  };

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

  it('Can create an account with success', async () =>
    frisby
      .post(`${LOCAL_URL}/sign-up`, newUser)
      .expect('status', 201)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Author created with success!');
        expect(result.payload.name).toBe(newUser.name);
        expect(result.payload.email).toBe(newUser.email);
        expect(result.payload.picture).toBe(newUser.picture);
      }));

  it('Cannot create a user without name', async () =>
    frisby
      .post(`${LOCAL_URL}/sign-up`, {
        email: 'meuemail@gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Name is missing!');
      }));

  it('Cannot create a user without email', async () =>
    frisby
      .post(`${LOCAL_URL}/sign-up`, {
        name: 'Meu nome',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email is missing!');
      }));

  it('Cannot create a user with wrong email', async () =>
    frisby
      .post(`${LOCAL_URL}/sign-up`, {
        name: 'Meu nome',
        email: 'meuemail.gmail.com',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email is not in the correct format!');
      }));

  it('Cannot create a user with wrong email too', async () =>
    frisby
      .post(`${LOCAL_URL}/sign-up`, {
        name: 'Meu nome',
        email: 'meuemailgmailcom',
        password: 'P@ssw0rd',
        picture: 'Alguma picture ae',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email is not in the correct format!');
      }));

  it('Cannot create a user without password', async () =>
    frisby
      .post(`${LOCAL_URL}/sign-up`, {
        name: 'Meu nome',
        email: 'meuemail@gmail.com',
        picture: 'Alguma picture ae',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Password is missing!');
      }));

  it('Cannot create a user that already exists', async () =>
    frisby
      .post(`${LOCAL_URL}/sign-up`, {
        name: 'Luis',
        email: 'luis@gmail.com',
        password: 'luis123',
        picture: 'alguma',
      })
      .expect('status', 409)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('User already exists with this info!');
      }));
});
