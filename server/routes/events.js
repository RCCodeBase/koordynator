const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Coordinator = require("../models/coordinator.model");
const events = require("../models/events.model");
const verify = require("./verifytoken");


router.get('/', verify,async (req, res) => {
   
   try {
    const event = await events.findOne({_id : req.query.params}); 
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
});


//Creating new event by coordinator
router.post("/settings", verify, async (req, res) => {
  console.log("Eventid:",req.body.Eventid);
  console.log("ParticipantDetails:",req.body.ParticipantSetting);
  const event = await events.findByIdAndUpdate(req.body.Eventid,{ $set: { ParticipantSettings: req.body.ParticipantSetting }});
  console.log(event);
  res.json("Partipant Setting Done");

});
module.exports = router;