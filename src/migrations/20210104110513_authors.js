
exports.up = async function(knex) {
  return knex.schema.createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.string('email', 50).notNullable();
    table.string('password', 50).notNullable();
    table.string('picture');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('authors');
};
