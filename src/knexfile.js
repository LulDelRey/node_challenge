require('dotenv/config');

const {
  OUSER,
  PASSWORD,
  HOST,
  DB_NAME_DEV,
  DB_NAME_PROD,
  DB_NAME_TEST,
  DB_DIALECT,
} = process.env;

module.exports = {
  test: {
    client: DB_DIALECT,
    connection: {
      host: HOST,
      user: OUSER,
      password: PASSWORD,
      database: DB_NAME_TEST,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
  development: {
    client: DB_DIALECT,
    connection: {
      host: HOST,
      user: OUSER,
      password: PASSWORD,
      database: DB_NAME_DEV,
    },
    debug: true,
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
  production: {
    client: DB_DIALECT,
    connection: {
      host: HOST,
      user: OUSER,
      password: PASSWORD,
      database: DB_NAME_PROD,
    },
    debug: true,
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  }
};
