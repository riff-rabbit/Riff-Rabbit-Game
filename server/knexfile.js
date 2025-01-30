require('dotenv').config();
const path = require('path');

const migrationsDirectory = path.join(__dirname, 'db/migrations');
const seedsDirectory = path.join(__dirname, '/db/seeds');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'your_password',
      database: 'capstone',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: migrationsDirectory,
    },
    seeds: {
      directory: seedsDirectory,
    },
  },
};
