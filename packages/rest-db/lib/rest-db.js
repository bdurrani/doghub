"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const { DoggyDb } = require("db-api");

const db = new DoggyDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/email_signup", async (req, res) => {
  console.log("POST");
  console.log(JSON.stringify(req.body));
  const body = req.body;
  if (!body) {
    res.json({ message: "no data" });
    return;
  }
  try {
    if (body.fname && body.lname) {
      const firstName = body.fname;
      const lastName = body.lname;
      const email = body.email;
      await db.adduser(firstName, lastName, email);
    }
    res.json({ email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, "0.0.0.0", async () => {
  console.log(`App listening on port ${port}!`);
  await db.connect();
  console.log("connected to db");
});
