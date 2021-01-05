require('dotenv/config');

const { OUSER, PASSWORD, DB_NAME } = process.env;
console.log(OUSER, PASSWORD, DB_NAME)

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
