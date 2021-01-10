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
      }));

  it('Cannot log in without email', async () =>
    frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: '',
        password: 'luis123',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing email!');
      }));

  it('Cannot log in without password', async () =>
    frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: '',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Missing password!');
      }));

  it('Cannot log in with wrong password', async () =>
    frisby
      .post(`${LOCAL_URL}/api/login`, {
        email: 'luis@gmail.com',
        password: 'someWrongPassword',
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe(
          "Uh, we couldn't find a user with these credentials, please try again!"
        );
      }));
});