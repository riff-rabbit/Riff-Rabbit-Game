const User = require('../models/User');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Before you have models you can always just do `await knex('table_name').del`
  await knex('challenges').del();
  await knex('users').del();

  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE challenges_id_seq RESTART WITH 1');

  // await knex('users').insert({
  //   username: 'alice',
  //   password: 'password',
  //   friends: [],
  //   display_name: 'Alice',
  //   high_score: 100,
  //   points: 1000,
  // });
  
  await User.create('alice', 'password', 'Alice',[3,2], 1500, 100);
  await User.create('philip', 'phil22', 'Philip', [3], 300, 10);
  await User.create('anastasia', '1234', 'Anastasia');
  await User.create('james', 'james', 'James');
  await User.create('jane', 'jane', 'Jane');
};


