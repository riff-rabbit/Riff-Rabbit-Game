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
const Challenge = require("../models/Challenge");
const User = require("../models/User");

const generatedGame = [
  {
    firstNote: "C3",
    secondNote: "G3",
    correct: "perfect fifth",
  },
  {
    firstNote: "C3",
    secondNote: "B3",
    correct: "major seventh",
  },
  {
    firstNote: "C3",
    secondNote: "E3",
    correct: "major third",
  },
  {
    firstNote: "C3",
    secondNote: "E3",
    correct: "major third",
  },
  {
    firstNote: "C3",
    secondNote: "B3",
    correct: "major seventh",
  },
  {
    firstNote: "C3",
    secondNote: "A3",
    correct: "major sixth",
  },
  {
    firstNote: "C3",
    secondNote: "F3",
    correct: "perfect fourth",
  },
  {
    firstNote: "C3",
    secondNote: "A#3",
    correct: "minor seventh",
  },
  {
    firstNote: "C3",
    secondNote: "A#3",
    correct: "minor seventh",
  },
  {
    firstNote: "C3",
    secondNote: "G#3",
    correct: "minor sixth",
  },
];
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Before you have models you can always just do `await knex('table_name').del`
  await knex("challenges").del();
  await knex("users").del();

  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE challenges_id_seq RESTART WITH 1");

  // await knex('users').insert({
  //   username: 'alice',
  //   password: 'password',
  //   friends: [],
  //   display_name: 'Alice',
  //   high_score: 100,
  //   points: 1000,
  // });

  await User.create("alice", "password", "Alice", [3, 2], 1500, 100);
  await User.create("philip", "phil22", "Philip", [3], 300, 10);
  await User.create("anastasia", "1234", "Anastasia");
  await User.create("james", "james", "James");
  await User.create("jane", "jane", "Jane");

  await User.create("sarah_connor", "1234", "Sarah", [1, 4], 200, 20);
  await User.create("john_doe", "1234", "John", [2, 3], 500, 50);
  await User.create("emma_woodhouse", "1234", "Emma", [], 100, 5);
  await User.create("george_smith", "1234", "George", [5], 750, 75);
  await User.create("hannah_banana", "1234", "Hannah", [1, 2, 3], 950, 95);

  await User.create("lucas_grey", "1234", "Lucas", [4], 150, 15);
  await User.create("mia_wang", "1234", "Mia", [2, 3, 4], 300, 30);
  await User.create("noah_flynn", "1234", "Noah", [], 450, 45);
  await User.create("olivia_jones", "1234", "Olivia", [1, 5], 600, 60);
  await User.create("ethan_hunt", "1234", "Ethan", [3], 700, 70);

  await User.create("sophia_loren", "1234", "Sophia", [2, 4], 850, 85);
  await User.create("liam_neeson", "1234", "Liam", [1], 400, 40);
  await User.create("charlotte_web", "1234", "Charlotte", [], 550, 55);
  await User.create("jacob_black", "1234", "Jacob", [5], 250, 25);
  await User.create("avery_brooks", "1234", "Avery", [3, 4], 650, 65);

  await User.create("isabella_swan", "1234", "Isabella", [1, 2], 800, 80);
  await User.create("benjamin_button", "1234", "Benjamin", [4], 350, 35);
  await User.create("amelia_earhart", "1234", "Amelia", [], 500, 50);
  await User.create("jackson_five", "1234", "Jackson", [2, 5], 900, 90);
  await User.create("madison_ivy", "1234", "Madison", [1, 3], 950, 95);

  await Challenge.create(1, 2, 1, JSON.stringify(generatedGame));
  await Challenge.create(2, 1, 2, JSON.stringify(generatedGame), "completed");
  await Challenge.create(
    3,
    7,
    0,
    JSON.stringify(generatedGame),
    "completed",
    7
  );
  await Challenge.create(4, 2, 1, JSON.stringify(generatedGame));
  await Challenge.create(5, 9, 2, JSON.stringify(generatedGame));
  await Challenge.create(
    10,
    3,
    3,
    JSON.stringify(generatedGame),
    "completed",
    10
  );
  await Challenge.create(
    6,
    1,
    4,
    JSON.stringify(generatedGame),
    "completed",
    1
  );

  await Challenge.create(8, 4, 0, JSON.stringify(generatedGame));
  await Challenge.create(
    9,
    5,
    1,
    JSON.stringify(generatedGame),
    "completed",
    9
  );
  await Challenge.create(
    7,
    8,
    2,
    JSON.stringify(generatedGame),
    "completed",
    8
  );
  await Challenge.create(2, 10, 3, JSON.stringify(generatedGame));
  await Challenge.create(
    1,
    6,
    4,
    JSON.stringify(generatedGame),
    "completed",
    6
  );
};
