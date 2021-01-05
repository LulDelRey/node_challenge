exports.up = function(knex) {
  return knex.schema.table('articles', (table) => {
    table.foreign('author_id').references('authors.id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('articles', (table) => {
    table.dropForeign('author_id');
  });
};
