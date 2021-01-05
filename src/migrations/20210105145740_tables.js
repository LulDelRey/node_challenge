exports.up = async function (knex) {
  return knex.schema
    .createTable('authors', (table) => {
      table.increments('id').primary();
      table.string('name', 50).notNullable();
      table.string('email', 50).notNullable();
      table.string('password', 50).notNullable();
      table.string('picture');
    })
    .createTable('articles', (table) => {
      table.increments('id').primary();
      table.integer('author_id').unsigned().references('authors.id');
      table.string('category').notNullable();
      table.string('title').notNullable();
      table.string('summary').notNullable();
      table.string('first_paragraph').notNullable();
      table.string('body').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('authors').dropTable('articles');
};
