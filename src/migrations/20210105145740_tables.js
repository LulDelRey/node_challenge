exports.up = async function (knex) {
  return knex.schema
    .createTable('authors', (table) => {
      table.increments('id').primary();
      table.string('name', 50).notNullable();
      table.string('email', 50).notNullable();
      table.string('password', 50).notNullable();
      table.string('picture');
      table.string('role', 7).notNullable();
    })
    .createTable('articles', (table) => {
      table.increments('id').primary();

      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('authors')
        .onDelete('CASCADE');

      table.string('category').notNullable();
      table.string('title').notNullable();
      table.string('summary', 512).notNullable();
      table.string('first_paragraph', 255).notNullable();
      table.string('body', 1024).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('articles').dropTableIfExists('authors');
};
