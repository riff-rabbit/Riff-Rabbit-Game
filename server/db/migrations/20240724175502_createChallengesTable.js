/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('challenges', (table) => {
        table.increments('id').primary();
        table.specificType('players', 'integer ARRAY');
        table.integer('game_id').notNullable();
        table.integer('winner').defaultTo(null);
        table.text('rounds');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('challenges');
};
