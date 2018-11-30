"use strict";
const { Pool, Client } = require("pg");

class DoggyDb {
  constructor() {
    this.client = new Client();
  }

  async connect() {
    await this.client.connect();
  }

  async adduser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      return false;
    }
    const largestIdQuery = "select id from users order by id desc limit 1";
    const idResponse = await this.client.query(largestIdQuery);
    let currentId = -1;
    if (idResponse.rowCount === 0) {
      currentId = 1;
    } else {
      const largestId = idResponse.rows[0].id;
      currentId = largestId + 1;
    }

    const usersQuery = `INSERT INTO users (id, first_name, last_name, email, enabled, verified) 
    values ($1, $2, $3, $4, true, true)`;
    const userResponse = await this.client.query(usersQuery, [
      currentId,
      firstName,
      lastName,
      email
    ]);

    return true;
  }

  async dispose() {
    await this.client.end();
  }
}

module.exports = DoggyDb;
