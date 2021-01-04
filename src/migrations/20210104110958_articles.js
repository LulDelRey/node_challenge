
exports.up = function(knex) {
  return knex.schema.createTable('articles', (table) => {
    table.increments('id').primary();
    table.integer('author_id').unsigned();
    table.string('category').notNullable();
    table.string('title').notNullable();
    table.string('summary').notNullable();
    table.string('first_paragraph').notNullable();
    table.string('body').notNullable();
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('articles');
};
