"use strict";

const dotenv = require("dotenv");
const DoggyDb = require("./doggydb");
dotenv.config();

async function test() {
  const db = new DoggyDb();
  await db.connect();
  //   const res = await db.adduser("another", "user", "dogdiggity213@dogdang.com");
  const users = await db.getUsers();
  const res = await db.getDogs(2);
  console.log(res);

  db.dispose();
}

(async () => {
  //   await test();
})();

module.exports = {
  DoggyDb
};
