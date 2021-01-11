require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Search articles tests', () => {
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

  it('Can search an specifc article', async () =>
    frisby
      .get(`${LOCAL_URL}/articles/?category=Performance`)
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Articles found!');
        expect(payload[0].title).toBe('Some performance tips');
        expect(payload[0].category).toBe('Performance');
        expect(payload[0].name).toBe('Luis');
      }));

  it('If no query return all articles', async () =>
    frisby
      .get(`${LOCAL_URL}/articles`)
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Articles found!');
        expect(payload.length).toBe(3);
        expect(payload[0].title).toBe('Some performance tips');
        expect(payload[0].category).toBe('Performance');
        expect(payload[0].name).toBe('Luis');
      }));
});
