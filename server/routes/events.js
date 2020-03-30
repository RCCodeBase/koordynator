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
module.exports = router;