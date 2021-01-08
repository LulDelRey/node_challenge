require('dotenv/config');

const { OUSER, PASSWORD, DB_NAME } = process.env;

module.exports = {
  test: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: OUSER,
      password: PASSWORD,
      database: 'objectionTesting',
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: OUSER,
      password: PASSWORD,
      database: DB_NAME,
    },
    debug: true,
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
};
