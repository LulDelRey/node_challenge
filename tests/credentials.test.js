require('dotenv/config');
const frisby = require('frisby');

const { LOCAL_URL } = process.env;

const knexInstance = require('../src/knex');

describe('Test suite', () => {
  beforeEach(async () => {
    return knexInstance.migrate
      .rollback()
      .then(async () => knexInstance.migrate.latest())
      .then(async () => knexInstance.seed.run());
  });

  afterAll(async () => knexInstance.destroy());

  describe('Log in tests', () => {
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

  describe('Sign up tests', () => {
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

  describe('Admin authors tests', () => {
    // NEED TO ADD A TOKEN FOR THESES TESTS TO RUN
    describe('Create authors tests', () => {
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

    describe('Read authors tests', () => {
      const testArr = [
        {
          name: 'Luis',
          email: 'luis@gmail.com',
          password: 'luis123',
          picture: 'alguma',
          role: 'ADMIN',
        },
        {
          name: 'Eduardo',
          email: 'eduedu@gmail.com',
          password: 'edu123',
          picture: 'algumatbm',
          role: 'CLIENT',
        },
        {
          name: 'Mari',
          email: 'mari@gmail.com',
          password: 'mari123',
          picture: 'outra',
          role: 'CLIENT',
        },
      ];
      const testAut = {
        name: 'Luis',
        email: 'luis@gmail.com',
        password: 'luis123',
        picture: 'alguma',
        role: 'ADMIN',
      };
      it('Can get all the authors', async () => {
        let token;
        await frisby
          .post(`${LOCAL_URL}/api/login`, {
            email: 'meuemail@gmail.com',
            password: 'P@ssw0rd',
          })
          .expect('status', 200)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.token).not.toBeDefined();
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
          .get(`${LOCAL_URL}/admin/authors`)
          .expect('status', 200)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.payload).toEqual(testPayload);
          });
      });

      it('Cannot get all the authors without token', async () =>
        frisby
          .get(`${LOCAL_URL}/api/admin/authors`)
          .expect('status', 401)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.message).toBe('Token not found!');
          }));

      it('Cannot get all the authors with invalid token', async () =>
        frisby
          .setup({
            request: {
              headers: {
                Authorization: 'some wrong token',
                'Content-Type': 'application/json',
              },
            },
          })
          .get(`${LOCAL_URL}/api/admin/authors`)
          .expect('status', 401)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.message).toBe('Invalid token!');
          }));

      it('Can get a specific author', async () => {
        let token;
        await frisby
          .post(`${LOCAL_URL}/api/login`, {
            email: 'meuemail@gmail.com',
            password: 'P@ssw0rd',
          })
          .expect('status', 200)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.token).not.toBeUndefined();
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
          .get(`${LOCAL_URL}/api/admin/authors/1`)
          .expect('status', 200)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.payload).toEqual(testAut);
          });
      });

      it('Cannot get a nonexistent author', async () => {
        let token;
        await frisby
          .post(`${LOCAL_URL}/api/login`, {
            email: 'meuemail@gmail.com',
            password: 'P@ssw0rd',
          })
          .expect('status', 200)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.token).not.toBeUndefined();
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
          .get(`${LOCAL_URL}/api/admin/authors/12312`)
          .expect('status', 404)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.message).toBe('Author not found!');
          });
      });

      it('Cannot get a specifc author without token', async () =>
        frisby
          .get(`${LOCAL_URL}/api/admin/authors/1`)
          .expect('status', 401)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.message).toBe('Token not found!');
          }));

      it('Cannot get a specific author with invalid token', async () =>
        frisby
          .setup({
            request: {
              headers: {
                Authorization: 'some wrong token',
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${LOCAL_URL}/api/admin/authors/1`)
          .expect('status', 401)
          .then((res) => {
            const { body } = res;
            const result = JSON.parse(body);
            expect(result.message).toBe('Invalid token!');
          }));
    });
    describe('Update authors tests', () => {
      it('Can update an author detail successfully', async () => {});
      it('Cannot update an author if not the author', async () => {});
      it('Cannot update an author without token', async () => {});
      it('Cannot update an author with wrong token', async () => {});
      it('Cannot update an author without name', async () => {});
      it('Cannot update an author without email', async () => {});
      it('Cannot update an author without password', async () => {});
    });
    describe('Delete authors tests', () => {
      it('Can delete author as admin', async () => {});
      it('Can delete author as author', async () => {});
      it('Cannot delete author without token', async () => {});
      it('Cannot delete author with wrong token', async () => {});
    });
  });

  describe('Admin articles tests', () => {
    describe('Create articles tests', () => {
      it('Can create an article with success', async () => {});
      it('Cannot create an article without token', async () => {});
      it('Cannot create an article with wrong token', async () => {});
      it('Cannot create an article without category', async () => {});
      it('Cannot create an article without title', async () => {});
      it('Cannot create an article without summary', async () => {});
      it('Cannot create an article without first paragraph', async () => {});
      it('Cannot create an article without body', async () => {});
    });
    describe('Read articles tests', () => {
      it('Can get all articles', async () => {});
      it('Cannot get articles without token', async () => {});
      it('Cannot get articles with invalid token', async () => {});
      it('Can get a specific article', async () => {});
      it('Cannot get a nonexistent article', async () => {});
      it('Cannot get a specifc article without token', async () => {});
      it('Cannot get a specific article with invalid token', async () => {});
    });
    describe('Update articles tests', async () => {
      it('Can update and article with success', async () => {});
      it('Cannot update an article if not the author', async () => {});
      it('Cannot update an article without token', async () => {});
      it('Cannot update an article with wrong token', async () => {});
      it('Cannot update an article without category', async () => {});
      it('Cannot update an article without title', async () => {});
      it('Cannot update an article without summary', async () => {});
      it('Cannot update an article without first paragraph', async () => {});
      it('Cannot update an article without body', async () => {});
    });
    describe('Delete articles tests', async () => {
      it('Can delete article as admin', async () => {});
      it('Can delete article as author', async () => {});
      it('Cannot delete article without token', async () => {});
      it('Cannot delete article with wrong token', async () => {});
    });
    describe('Search articles tests', async () => {
      it('Can search an specifc article', async () => {});
      it('If no query return no articles or all of them', async () => {});
    })
  });
});
