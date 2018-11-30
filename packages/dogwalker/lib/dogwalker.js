"use strict";

const schedule = require("node-schedule");
require("dotenv").config();

const nodemailer = require("nodemailer");
const { DoggyDb } = require("db-api");

// MAILER

const mail_template = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Alerts e.g. approaching your limit</title>


<style type="text/css">
img {
max-width: 100%;
}
body {
-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
}
body {
background-color: #f6f6f6;
}
@media only screen and (max-width: 640px) {
  body {
    padding: 0 !important;
  }
  h1 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h2 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h3 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h4 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h1 {
    font-size: 22px !important;
  }
  h2 {
    font-size: 18px !important;
  }
  h3 {
    font-size: 16px !important;
  }
  .container {
    padding: 0 !important; width: 100% !important;
  }
  .content {
    padding: 0 !important;
  }
  .content-wrap {
    padding: 10px !important;
  }
  .invoice {
    width: 100% !important;
  }
}
</style>
</head>

<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">

<table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
		<td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
			<div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
				<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 20px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 20px; margin: 0;"><td class="alert alert-warning" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 20px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #40a9ff; margin: 0; padding: 20px;" align="center" bgcolor="#40a9ff" valign="top">
							Doghub Weekly Digest
						</td>
					</tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                            <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
    

                            <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 50;">
                                <td style="width: 20%">
                                    <div style="width: 150px;
                                    height: 150px;
                                    overflow: hidden;
                                    margin: 10px;
                                    position: relative;">

                                        <img src="https://s3.us-east-2.amazonaws.com/doghub/dog_images/abbey-123123.jpg"
                                        style=
                                        "position: absolute;
                                        left: -1000%;
                                        right: -1000%;
                                        top: -1000%;
                                        bottom: -1000%;
                                        margin: auto;
                                        min-height: 100%;
                                        min-width: 100%;
                                        border-radius: 10px;">
                                    </div>

                                </td>

                                <td style="width: 60%">
                                    Hi! My name is <b>Abby</b> and I'm 2 years young. I'm a sweet girl that is looking for a home as an only pet so I can receive all your love. I'm looking for a mature household with a fenced yard where I can run and play.
                                </td>
                                
                                <td style="width: 20%">
                                <a href="http://hsdr.org/wrapper_popup.php?id=37894453&css=http://hsdr.org/css/adoptions.css" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 5px 5px;">Adopt Me!</a>
                                </td>
                            </tr>  


                            <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 50;">
                                <td style="width: 20%">
                                    <div style="width: 150px;
                                    height: 150px;
                                    overflow: hidden;
                                    margin: 10px;
                                    position: relative;">

                                        <img src="http://g.petango.com/photos/1339/227df349-abb5-49c1-9d40-efeaed9053a4.jpg"
                                        style=
                                        "position: absolute;
                                        left: -1000%;
                                        right: -1000%;
                                        top: -1000%;
                                        bottom: -1000%;
                                        margin: auto;
                                        min-height: 100%;
                                        min-width: 100%;
                                        border-radius: 10px;">
                                    </div>

                                </td>

                                <td style="width: 60%">
                                    	
Hi! My name is <b>Goldie</b> and I'm 2.5 years young. I'm a very friendly girl who loves to be around people. I have lots and lots of energy, so I am looking for an active household that will take me out on adventures. If you are looking for a fun, active dog then I'm the girl for you! 
                                </td>
                                
                                <td style="width: 20%">
                                <a href="http://hsdr.org/wrapper_popup.php?id=37991605&css=http://hsdr.org/css/adoptions.css" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 5px 5px;">Adopt Me!</a>
                                </td>
                            </tr>


                            <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 50;">
                                <td style="width: 20%">
                                    <div style="width: 150px;
                                    height: 150px;
                                    overflow: hidden;
                                    margin: 10px;
                                    position: relative;">

                                        <img src="http://g.petango.com/photos/1339/8c86fb67-5cf7-4a46-9369-7bb94d580966.jpg"
                                        style=
                                        "position: absolute;
                                        left: -1000%;
                                        right: -1000%;
                                        top: -1000%;
                                        bottom: -1000%;
                                        margin: auto;
                                        min-height: 100%;
                                        min-width: 100%;
                                        border-radius: 10px;">
                                    </div>

                                </td>

                                <td style="width: 60%">
                                Hi! My name is <b>Joe</b> and I'm a 7 year old Boxer Mix, who came to HSDR after jumping out of a second story window. I was rushed to the emergency veterinarian, was given a full body x-ray and was taken to a specialist for a neurological exam. I'm still a little wobbly when I get excited but my tail is wagging and I'm improving daily.
                                </td>
                                
                                <td style="width: 20%">
                                <a href="http://hsdr.org/wrapper_popup.php?id=38565965&css=http://hsdr.org/css/adoptions.css" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 5px 5px;">Adopt Me!</a>
                                </td>
                            </tr>

            
                            
                            

                            </table></div></div><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                            <table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top"><a href="http://www.mailgun.com" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">Unsubscribe</a> from these alerts.</td>
                                </tr></table></div>
		</td>
		<td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
	</tr></table></body>
</html>`;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "doghubnewsletter@gmail.com",
    pass: "Hubdoc1!"
  }
});

const mailOptions = {
  from: "Doghub News <doghubnewsletter@gmail.com>", // sender address
  to: "bilal@hubdoc.com", // list of receivers
  subject: "Doghub Weekly 🐶", // Subject line
  html: mail_template // plain text body
};

// transporter.sendMail(mailOptions, function(err, info) {
//   if (err) console.log(err);
//   else console.log(info);
// });
function sendEmail(email) {
  const mailOptions = {
    from: "Doghub News <doghubnewsletter@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Doghub Weekly 🐶", // Subject line
    html: mail_template // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(`error: ${err}`);
    } else console.log(info);
  });
}
// SCHEDULER

let userMap = new Map();
const dogDb = new DoggyDb();

// async function dogwalker() {
//   let rule = new schedule.RecurrenceRule();
//   //run job every minute
//   rule.second = 10;
//   let job = schedule.scheduleJob(rule, async function() {
//     //sgMail.send(msg);
//     await doWork();
//   });

//   let rule2 = new schedule.RecurrenceRule();
//   //run job every minute
//   rule2.second = 10;
//   let job2 = schedule.scheduleJob(rule2, function() {
//     console.log("Next!");
//   });
// }

const INTERVAL_TIME = 5000;
async function dogwalker2() {
  await doWork();

  setTimeout(async () => {
    await dogwalker2();
  }, INTERVAL_TIME);
}

setTimeout(() => dogwalker2(), INTERVAL_TIME);

async function doWork() {
  try {
    console.log("go do work");
    const users = await dogDb.getUsers();
    if (!users) {
      return;
    }

    if (users.length > userMap.size) {
      for (let i = 0; i < users.length; i++) {
        if (!userMap.has(users[i].id)) {
          const email = users[i].email;
          console.log(`sent this user an email ${email}`);
          sendEmail(email);
        }
      }

      userMap.clear();
      users.forEach(item => {
        userMap.set(item.id, item);
      });
      userCounter = userMap.length;
    }
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

(async () => {
  await dogDb.connect();
  await dogwalker2();
  //   await dogwalker();
})();
module.exports = dogwalker;
