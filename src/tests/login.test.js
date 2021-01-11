require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Log in tests', () => {
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  it('Can log in with success', async () =>
    frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'luis@gmail.com',
        password: 'luis123',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('User athenticated with success!');
        expect(result.payload).not.toBeUndefined();
      }));

  it('Cannot log in without email', async () =>
    frisby
      .post(`${LOCAL_URL}/login`, {
        email: '',
        password: 'luis123',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email is missing!');
      }));

  it('Cannot log in without password', async () =>
    frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'luis@gmail.com',
        password: '',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Password is missing!');
      }));

  it('Cannot log in with wrong password', async () =>
    frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'luis@gmail.com',
        password: 'someWrongPassword',
      })
      .expect('status', 409)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe(
          "User doesn't exists with this information!"
        );
      }));
});
