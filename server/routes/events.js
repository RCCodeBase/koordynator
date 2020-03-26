const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Coordinator = require("../models/coordinator.model");
const events = require("../models/events.model");
const verify = require("./verifytoken");

//Sending Event Details to the coordinator page
router.get("/coordinator", verify, async (req, res) => {
  try {
    const eventsCoord = await events.find(
      { Coordinator: req.user._id },
      { _id:1,Title: 1, EventType: 1, Description: 1, Volunteer: 1 }
    );
    res.json(eventsCoord);
  } catch (err) {
    res.json({ message: err });
  }
});

//Creating new event by coordinator
router.post("/coordinator", verify, async (req, res) => {
  console.log(req.body.EventType);
  const event = new events({
    Title: req.body.Title,
    EventType: req.body.EventType,
    Description: req.body.Description,
    Volunteer: req.body.volunteer,
    Coordinator: req.user._id
  });
  try {
    const savedCoordinator = await event.save();
    res.json(savedCoordinator._id);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
