const express = require("express");
const multer = require("multer");
const Subscribe = require("../models/subscribe");
const fs= require('fs');
const path = require('path');
const nodemailer = require('nodemailer')
const Subscriber = require("../models/subscriber");
const config = require('../nodemailerConfig.json');
// const { type } = require("jquery");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images/mail");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

exports.sendmails = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const subscribe = new Subscribe({
    subject: req.body.subject,
    content: req.body.content,
    imagePath: url + "/images/mail/" + req.file.filename,
  });


  b = req.body;
  console.log("sending mails");
  console.log(b);
  subscribe.save().then((createSubscribe) => {
    res.status(201).json({
      message: "Subscribe added successfully",
      b,
    });
  });

  // console.log(req.body);
  // console.log(req.file)
  // console.log(req.file.path)
  if (!req.body.content || !req.body.subject) {
    res.status(400).send("ERROR: Some form data is missing.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: config.fromMail, // Set this in environment var
      pass: config.pass, // Set this in environment var
    },
  });

  //for sending multiple recipients simply assign array of mails to 'to'
  // const mailList = ["nitishkumar12c@gmail.com"];
  var mailList = [];
  //  console.log(typeof(mailList));
   Subscriber.find().then(document =>{
    for(i =  0;i<document.length;i++){

      console.log(document[i]["email"]);
      mailList.push(document[i].email);
      // console.log(mailList + "mia");
    }
    return mailList;
  })
  .then((mailList) =>{
    // console.log(mailList + "niche hui hai");
    const mailOptions = {
      from: config.fromMail,
      to: mailList,
      subject: req.body.subject,
      // Email body.
      // text: req.body.content,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="./index.css">
          <style>
          body{
            color: white;
            font-family: sans-serif;
            margin: 0px;
            padding: 0px;
            font-size: 16px;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        #page-container {
            position: relative;
            min-height: 100vh;
            margin: 0px 10%;
            padding: 5%;
            background: black;
          }

          #content-wrap {
            padding-bottom: 2.5rem;
          }
        .head{
            display: flex;
            justify-content: space-between;
        }
        .logo2{
            width: 53%;
        }
        .logo{
            width: 23%;
            margin-right: 15%;
        }
        .mail{
            padding: 30px 10px 10px;
        }
        .line2{
            text-align: justify;
            padding: 10px 0px;
        }
        .line1{
            font-size: 18px;
        }
        #footer{
            margin-top: auto;
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
            padding: 13% 0 0;
        }
        footer div{
            display: flex;
            width: 65%;

        }
        footer  div ul{
            padding-left: 5vw;
            align-self: center;
        }
        .msg{
            font-size: 12px;
            align-self: center;
            color: white;
            padding: 2.3% 0 2.4% 3%;
            width: 35%;
            align-items: center;
            justify-content: center;
            text-align: center;

        }
        .ig img{

            width: 17px;
        }
        .fb img{
            width: 8px;
        }
        .yt img{
            width: 20px;
        }
        li{
            list-style: none;
        }

        @media screen and (max-width: 450px) {
          #page-container {
            margin: 0;
            padding: 10% 2px 0 2px;
          }

          .logo{
            padding-left: 5%;
          }

          .msg {
            display: none;
          }
        }

          </style>
      </head>
      <body style="color: white">
        <div id="page-container">
          <div id="content-wrap">
             <div class="head" >
              <img  class="logo" src="cid:logo@innova.ee" alt="">
              <img  class="logo2" src="cid:head@innova.ee" alt="">
            </div>
        <section class="mail">

          <div class="line1" > <b>Thank you for becoming a part of the INNOVA family.</b> </div>
         <div class="line2" >We at INNOVA aspire to organize the greatest Techno-Management fest in India and for that we hold events that actually add value to your life . Our latest event is in line with these values.
            About event <br></div>` + req.body.content +
          `<br><br><div class="line3">  We are looking forward to your presence in our latest event</div>
        </section>
          </div>
          <footer id="footer" style="align-items: center">
            <div class="msg">Connect with us</div>
            <div>
                <ul class="fb" >
                  <li><a href="https://www.facebook.com/innovadtu"><img src="cid:fb@innova.ee" alt=""></a></li>
              </ul>
              <ul class="ig" >
                  <li><a href="https://www.instagram.com/innovadtu/"><img src="cid:insta@innova.ee" alt=""></a></li>
              </ul>
              <ul class="ig" >
                  <li><a href="https://www.linkedin.com/company/innova-dtu/mycompany/"><img src="cid:in@innova.ee" alt=""></a></li>
              </ul>
              <ul class="yt" >
                  <li><a href="https://www.youtube.com/channel/UCz52tpa7b4vV24SbgreRiuA"><img src="cid:youtube@innova.ee" alt=""></a></li>
              </ul>
            </div>
          </footer>
        </div>
          </footer>
        </body>
          </html>`,

      //array of objects for attachments
      attachments: [
        {
          filename: "",
          path: req.file.path
        },
        {
          filename: "",
          path: "./public/innova-logo-blue.png",
          cid: 'logo@innova.ee'
        },
        {
          filename: "",
          path: "./public/Head2.png",
          cid: 'head@innova.ee'
        },
        {
          path: "./public/facebook.png",
          cid: "fb@innova.ee"
        },
        {
          path: "./public/insta.png",
          cid: 'insta@innova.ee'
        },
        {
          path: "./public/youtube.png",
          cid: "youtube@innova.ee"
        },
        {
          path: "./public/in.png",
          cid: "in@innova.ee"
        }
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .send(`Something went wrong. Unable to send email\nERROR:\n${error}`);
        } else {
        console.log(`Email sent: ${info.response}`);
        // console.log(mailList);
      }
    });

  })


  // console.log(maildoc)

};
