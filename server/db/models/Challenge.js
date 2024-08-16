const knex = require("../knex");
const authUtils = require("../../utils/auth-utils");

class Challenge {
  #password = null; // a private property

  // This constructor is NOT how a controller creates a new user in the database.
  // Instead, it is used by each of the User static methods to hide the hashed
  // password of users before sending user data to the client. Since #passwordHash
  // is private, only the isValidPassword instance method can access that value.
  constructor({ id, challenger, responder, preset, winner, rounds, created_at, status }) {
    this.id = id;
    this.challenger = challenger;
    this.responder = responder;
    this.preset = preset;
    this.winner = winner;
    this.rounds = rounds;
    this.created_at = created_at;
    this.status = status;
  }

  static async list() {
    const query = `SELECT * FROM challenges`;
    const { rows } = await knex.raw(query);
    
    return rows.map((challenge) => new Challenge(challenge));
  }

  static async find(id) {
    const query = `SELECT * FROM challenges WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const challenge = rows[0];
    return challenge ? new Challenge(challenge) : null;
  }

  static async findByResponder(id) {
    const query = `SELECT * FROM challenges WHERE responder = ?`;
    const { rows } = await knex.raw(query, [id]);
    return rows.map((challenge) => new Challenge(challenge));
  }

  static async create(challenger, responder, preset, rounds, status = 'pending') {
    // hash the plain-text password using bcrypt before storing it in the database);
    const query = `INSERT INTO challenges (challenger, responder, preset, rounds, status)
      VALUES (?, ?, ?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [challenger, responder, preset, rounds, status]);
    const challenge = rows[0];
    return new Challenge(challenge);
  }

  // this is an instance method that we can use to update
  //ahhhh i see whats going on . here


  
  static async updateChallengeStatus(id, status) { 
    // dynamic queries are easier if you add more properties
    const query = `
      UPDATE challenges
      SET status=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [status, id]);
    const updatedChallenge = rows[0];
    return updatedChallenge ? new Challenge(updatedChallenge) : null;
  }

  static async deleteAll() {
    return knex("challenges").del();
  }

}


module.exports = Challenge;
