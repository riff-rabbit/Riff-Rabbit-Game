const knex = require("../knex");
const authUtils = require("../../utils/auth-utils");

class User {
  #password = null; // a private property

  // This constructor is NOT how a controller creates a new user in the database.
  // Instead, it is used by each of the User static methods to hide the hashed
  // password of users before sending user data to the client. Since #passwordHash
  // is private, only the isValidPassword instance method can access that value.
  constructor({ id, username, password, display_name, high_score, points, friends }) {
    this.id = id;
    this.username = username;
    this.#password = password;
    this.display_name = display_name;
    this.high_score = high_score;
    this.points = points;
    this.friends = friends;
  }

  // This instance method takes in a plain-text password and returns true if it matches
  // the User instance's hashed password.
  isValidPassword = async (password) =>
    authUtils.isValidPassword(password, this.#password)
    // password === this.#password;

  static async list() {
    const query = `SELECT * FROM users`;
    const { rows } = await knex.raw(query);
    // use the constructor to hide each user's passwordHash
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const { rows } = await knex.raw(query, [username]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async create(username, password, display_name,friends = [], points = 0, high_score = 0) {
    // hash the plain-text password using bcrypt before storing it in the database
    const passwordHash = await authUtils.hashPassword(password);

    const query = `INSERT INTO users (username, password, display_name, friends, points, high_score)
      VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [username, passwordHash, display_name,friends, points, high_score]);
    const user = rows[0];
    return new User(user);
  }

  static async getTop5Users() {
    const query = `
      SELECT id, display_name, points
      FROM users
      ORDER BY points DESC
      LIMIT 5
    `;
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  // this is an instance method that we can use to update
  //ahhhh i see whats going on . here


  
  static async update(id, username) {
    // dynamic queries are easier if you add more properties
    const query = `
      UPDATE users
      SET username=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [username, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async deleteAll() {
    return knex("users").del();
    // DELETE FROM users;
  }

  static async updatePoints(id, newPoints) {
    const query = `
      UPDATE users
      SET points = ?
      WHERE id = ?
      RETURNING *;
    `;
    const { rows } = await knex.raw(query, [newPoints, id]);
    return rows[0] ? new User(rows[0]) : null;
  }

  static async updateUser(id, updates) {
    const { friends } = updates;
    const query = `UPDATE users SET friends = ? WHERE id = ? RETURNING *;`;
    const values = [friends, id];
    try {
      const { rows } = await knex.raw(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Failed to update user:', error);
    }
  }
}


module.exports = User;
