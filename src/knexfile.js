require('dotenv/config');

const { OUSER, PASSWORD, DB_NAME } = process.env;

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: OUSER,
      password: PASSWORD,
      database: DB_NAME,
    },
    debug: true,
  },
};
