const router = require("express").Router();
const jwt = require("jsonwebtoken");
const events = require("../models/events.model");
const verify = require("./verifytoken");
const participant = require("../models/participant.model");
const { registerValidationParticipant } = require('./validation');

//Creating new Participant
router.post('/', verify,async (req, res) => {

    //add validation for Participant
    const { error } = registerValidationParticipant(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already registered
    // const emailExist = await participant.findOne({ email: req.body.email });
    // if (emailExist) return res.status(400).send('Email already Existed');

    const ParticipantPerson = new participant({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        event : req.body.eventid
    });
    console.log("printing participantperoson",ParticipantPerson);
    try {
        const savedParticipant = await ParticipantPerson.save();
        res.json(savedParticipant);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//Getting alll Particiapants of oneEvent
router.get('/details',verify,async (req, res)=>{
    console.log("Here",req.query.params);
    try {
        const participantDetails = await participant.find(
            { event: req.query.params },
            {  name: 1, email: 1, company: 1 }
          ) ; 

        res.json(participantDetails);
      } catch (err) {
        res.json({ message: err });
      }
});

router.post('/saveParticipant',verify,async (req, res)=>{
    const ParticipantPerson = new participant({
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.Phoneno,
        age: req.body.Age,
        company : req.body.Company,
        education:req.body.Education,
        PaymentData:req.body.PaymentData,
        address:req.body.address1,
        event:req.body.eventid
    });
    try {
        const savedParticipant = await ParticipantPerson.save();
        res.json(savedParticipant);
    }
    catch (err) {
        res.json({ message: err });
    }


});

module.exports = router;