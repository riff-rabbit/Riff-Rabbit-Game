/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('challenges', (table) => {
        table.increments('id').primary();
        table.integer('challenger').notNullable();
        table.integer('responder').notNullable();
        table.integer('preset').notNullable();
        table.integer('winner').defaultTo(null);
        table.text('rounds');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.text('status').defaultTo('pending');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('challenges');
};
