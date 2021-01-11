require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Create articles tests', () => {
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

  // BUG: Frisby is not sending the authorization toke and i can't figure out why
  it('Can create an article with success', async () => {
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
      .post(`${LOCAL_URL}/admin/articles`, {
        title: 'Test title',
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 201)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Article created with success!');
      });
  });

  it('Cannot create an article without token', async () => {
    await frisby
      .post(`${LOCAL_URL}/admin/articles`, {
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Token not found!');
      });
  });

  it('Cannot create an article with wrong token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'token',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${LOCAL_URL}/admin/articles`, {
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Invalid token!');
      });
  });

  it('Cannot create an article without category', async () => {
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
      .post(`${LOCAL_URL}/admin/articles`, {
        title: 'Test title',
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Category is missing!');
      });
  });

  it('Cannot create an article without title', async () => {
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
      .post(`${LOCAL_URL}/admin/articles`, {
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Title is missing!');
      });
  });

  it('Cannot create an article without summary', async () => {
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
      .post(`${LOCAL_URL}/admin/articles`, {
        title: 'Test title',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Summary is missing!');
      });
  });

  it('Cannot create an article without first paragraph', async () => {
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
      .post(`${LOCAL_URL}/admin/articles`, {
        title: 'Test title',
        summary: 'This is a test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('First paragraph is missing!');
      });
  });

  it('Cannot create an article without body', async () => {
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
      .post(`${LOCAL_URL}/admin/articles`, {
        title: 'Test title',
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        category: 'Test',
      })
      .expect('status', 422)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Body is missing!');
      });
  });
});
