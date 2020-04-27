const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Coordinator = require("../models/coordinator.model");
const events = require("../models/events.model");
const verify = require("./verifytoken");

//Creating new event by coordinator
router.post("/event", verify, async (req, res) => {
  const user =  await Coordinator.findOne({ email: req.user.email });
  console.log("Logging user details from database",user);
  const event = new events({
    Title: req.body.Title,
    EventType: req.body.EventType,
    Description: req.body.Description,
    Volunteer: req.body.volunteer,
    Coordinator: user._id
  });
  try {
    const savedCoordinator = await event.save();
    res.json(savedCoordinator._id);
  } catch (err) {
    res.json({ message: err });
  }
});

//Sending Event Details to the coordinator page
router.get("/event", verify, async (req, res) => {
  const user =  await Coordinator.findOne({ email: req.user.email });
  try {
    const eventsCoord = await events.find(
      { Coordinator: user._id },
      { _id: 1, Title: 1, EventType: 1, Description: 1, Volunteer: 1 }
    );
    res.json(eventsCoord);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
