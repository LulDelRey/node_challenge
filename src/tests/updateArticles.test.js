require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../knex');

describe('Update articles tests', () => {
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

  it('Can update and article with success', async () => {
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
      .put(`${LOCAL_URL}/admin/articles/1`, {
        title: 'Test title',
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const { message, payload } = JSON.parse(body);
        expect(message).toBe('Article updated successfully');
        expect(payload.title).toBe('Test title');
        expect(payload.summary).toBe('This is a test');
        expect(payload.first_paragraph).toBe('A very convincing test');
        expect(payload.body).toBe('A very very very good test');
        expect(payload.category).toBe('Test');
      });
  });

  it('Cannot update an article if not the author', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'mari@gmail.com',
        password: 'mari123',
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
      .put(`${LOCAL_URL}/admin/articles/2`, {
        title: 'Test title',
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 403)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('User not the author!');
      });
  });

  it('Cannot update an article without token', async () => {
    await frisby
      .put(`${LOCAL_URL}/admin/articles/2`, {
        title: 'Test title',
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

  it('Cannot update an article with wrong token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'token',
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${LOCAL_URL}/admin/articles/2`, {
        title: 'Test title',
        summary: 'This is a test',
        first_paragraph: 'A very convincing test',
        body: 'A very very very good test',
        category: 'Test',
      })
      .expect('status', 401)
      .then((res) => {
        const { body } = res;
        const { message } = JSON.parse(body);
        expect(message).toBe('Invalid token');
      });
  });

  it('Cannot update an article without category', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'mari@gmail.com',
        password: 'mari123',
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
      .put(`${LOCAL_URL}/admin/articles/3`, {
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

  it('Cannot update an article without title', async () => {
    let token;
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'mari@gmail.com',
        password: 'mari123',
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
      .put(`${LOCAL_URL}/admin/articles/3`, {
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

  it('Cannot update an article without summary', async () => {
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'mari@gmail.com',
        password: 'mari123',
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
      .put(`${LOCAL_URL}/admin/articles/3`, {
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

  it('Cannot update an article without first paragraph', async () => {
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'mari@gmail.com',
        password: 'mari123',
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
      .put(`${LOCAL_URL}/admin/articles/3`, {
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

  it('Cannot update an article without body', async () => {
    await frisby
      .post(`${LOCAL_URL}/login`, {
        email: 'mari@gmail.com',
        password: 'mari123',
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
      .put(`${LOCAL_URL}/admin/articles/3`, {
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
