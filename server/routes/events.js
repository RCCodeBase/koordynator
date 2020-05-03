const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Coordinator = require("../models/coordinator.model");
const events = require("../models/events.model");
const verify = require("./verifytoken");
var nodemailer = require("nodemailer");

//Sending Event details without loggined user
router.get("/", verify, async (req, res) => {
  try {
    const event = await events.findOne({ _id: req.query.params });
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
});

//Sending Event details without loggin in Because Participant want to register
router.get("/anonymous", async (req, res) => {
  try {
    const event = await events.findOne({ _id: req.query.params });
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
});

//Creating new event by coordinator
router.post("/settings", verify, async (req, res) => {
  console.log("Eventid:", req.body.Eventid);
  console.log("ParticipantDetails:", req.body.ParticipantSetting);
  const event = await events.findByIdAndUpdate(req.body.Eventid, {
    $set: { ParticipantSettings: req.body.ParticipantSetting },
  });
  console.log(event);
  res.json("Partipant Setting Done");
});

//Sending Event Link to Others
router.post("/inviteOthers", verify, async (req, res) => {
  console.log("email:", req.body.mail);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rahultdpz143@gmail.com",
      pass: "949504862",
    },
  });

  var mailOptions = {
    from: "rahultdpz143@gmail.com",
    to: req.body.mail,
    subject: "Please Follow the invitation Link for Participante in the Event",
    text: "Please Find Th attached link and register for the Event " + req.body.url,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json(
        "Unable to sent mail right now.Please try agian after some time"
      );
    } else {
      console.log("Email sent: " + info.response);
      res.json("Email Sent");
    }
  });
});

module.exports = router;
