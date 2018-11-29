'use strict';

module.exports = restDb;

const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/email_signup', upload.array(), (req, res) => {
    const email = req.body.email;
    const fName = req.body.fname;
    const lName = req.body.lname;
    res.json({email});
    }
)

app.listen(port, '0.0.0.0', () => console.log(`App listening on port ${port}!`))

function restDb() {
    // TODO
}
