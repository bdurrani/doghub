"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/email_signup", (req, res) => {
  console.log("POST");
  console.log(JSON.stringify(req.body.email));
  const email = req.body.email;
  res.json({ email });
});

app.listen(port, "0.0.0.0", () =>
  console.log(`App listening on port ${port}!`)
);
