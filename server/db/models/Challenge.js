const knex = require("../knex");
const authUtils = require("../../utils/auth-utils");

class Challenge {
  #password = null; // a private property

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

  static async create(id, challenger, responder, preset, rounds, status = 'pending', winner = null) {
    const query = `
      INSERT INTO challenges (id, challenger, responder, preset, rounds, status, winner)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `;
    
    const { rows } = await knex.raw(query, [
      id,
      challenger,
      responder,
      preset,
      rounds,
      status,
      winner
    ]);
    
    return rows[0] ? new Challenge(rows[0]) : null;
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

  // Challenge.js
  static async updateChallengeResult(id, status, winnerId) {
    const query = `
      UPDATE challenges
      SET status = ?, winner = ?
      WHERE id = ?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [status, winnerId, id]);
    const updatedChallenge = rows[0];
    return updatedChallenge ? new Challenge(updatedChallenge) : null;
  }



}


module.exports = Challenge;
