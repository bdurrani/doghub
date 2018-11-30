'use strict';

const schedule = require('node-schedule');
require('dotenv').config()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'laurence@hubdoc.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

function dogwalker() {
    let rule = new schedule.RecurrenceRule();
    //run job every minute
    rule.second =  5;
    let job = schedule.scheduleJob(rule, function(){
        sgMail.send(msg);
    });

    let rule2 = new schedule.RecurrenceRule();
    //run job every minute
    rule2.second =  5;
    let job2 = schedule.scheduleJob(rule2, function(){
        console.log('Next!');
    });
}

dogwalker();
module.exports = dogwalker;