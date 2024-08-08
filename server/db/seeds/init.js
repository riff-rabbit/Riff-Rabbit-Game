const presets = [
  {
    name: "Octathon",
    rounds: 10,
    startOnC: true,
    direction: "ascending",
    octaves: 1,
    secondsPerRound: 10,
  },
  {
    name: "Octathon Turbo",
    rounds: 10,
    startOnC: true,
    direction: "both",
    octaves: 1,
    secondsPerRound: 10,
  },
  {
    name: "Ascendethon",
    rounds: 12,
    startOnC: true,
    direction: "ascending",
    octaves: 2,
    secondsPerRound: 10,
  },
  {
    name: "Descendethon",
    rounds: 12,
    startOnC: true,
    direction: "descending",
    octaves: 2,
    secondsPerRound: 10,
  },
  {
    name: "Intervalley Mega",
    rounds: 15,
    startOnC: false,
    direction: "both",
    octaves: 2,
    secondsPerRound: 5,
  },
  {
    name: "Intervalley Maestro",
    rounds: Infinity,
    startOnC: false,
    direction: "both",
    octaves: 2,
    secondsPerRound: 5,
  },
];
const Challenge = require('../models/Challenge');
const User = require('../models/User');





const generatedGame = [
  {
      "firstNote": "C3",
      "secondNote": "G3",
      "correct": "perfect fifth"
  },
  {
      "firstNote": "C3",
      "secondNote": "B3",
      "correct": "major seventh"
  },
  {
      "firstNote": "C3",
      "secondNote": "E3",
      "correct": "major third"
  },
  {
      "firstNote": "C3",
      "secondNote": "E3",
      "correct": "major third"
  },
  {
      "firstNote": "C3",
      "secondNote": "B3",
      "correct": "major seventh"
  },
  {
      "firstNote": "C3",
      "secondNote": "A3",
      "correct": "major sixth"
  },
  {
      "firstNote": "C3",
      "secondNote": "F3",
      "correct": "perfect fourth"
  },
  {
      "firstNote": "C3",
      "secondNote": "A#3",
      "correct": "minor seventh"
  },
  {
      "firstNote": "C3",
      "secondNote": "A#3",
      "correct": "minor seventh"
  },
  {
      "firstNote": "C3",
      "secondNote": "G#3",
      "correct": "minor sixth"
  }
]
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

  await Challenge.create(1, 2, 1, JSON.stringify(generatedGame));
  await Challenge.create(2, 1, 2, JSON.stringify(generatedGame), 'winner');
};


