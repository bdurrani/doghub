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

  async getUsers() {
    const usersQuery =
      "select id, email, first_name, last_name from users where enabled = true ";

    const usersResponse = await this.client.query(usersQuery);
    if (!usersResponse || usersResponse.rowCount === 0) {
      return [];
    }

    return usersResponse.rows.map(user => {
      return {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      };
    });
  }

  async getDogs(userId) {
    const lastSentQuery = `
        select last_date_sent from users where id = $1 
        `;

    const dateResponse = await this.client.query(lastSentQuery, [userId]);

    if (!dateResponse || dateResponse.rowCount === 0) {
      return false;
    }

    const lastDate = dateResponse.rows[0].last_date_sent;
    const dogBase = `
    SELECT dogs.id, organization.name, dogs.name, dogs.gender, dogs.profile_url, dogs.description, dogs.date_added, dogs.date_removed, dog_images.s3_hash 
	FROM public.dogs 
	join public.organization on
    dogs.org_id = organization.id
    	join public.dog_images on
		dogs.id = dog_images.dog_id
    `;

    let dogquery = "";
    let dogs = [];
    if (lastDate) {
      const dogsQueryIfNull = ` ${dogBase}
	where dogs.date_added < $1 and dogs.date_removed is null
        `;
      dogs = await this.client.query(dogsQueryIfNull, [lastDate]);
      console.log(dogs);
    } else {
      const dogsQueryIfNull = ` ${dogBase}
	where dogs.date_added < now() and dogs.date_removed is null
        `;
      dogs = await this.client.query(dogsQueryIfNull);
      console.log(dogs);
    }

    const images_url = "https://s3.us-east-2.amazonaws.com/doghub/dog_images/";
    return dogs.rows.map(dog => {
      return {
        name: dog.name,
        gender: dog.gender,
        id: dog.id,
        url: dog.profile_url,
        description: dog.description,
        image_base: images_url + dog.s3_hash
      };
    });
  }

  async dispose() {
    await this.client.end();
  }
}

module.exports = DoggyDb;
