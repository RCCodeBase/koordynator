const router = require("express").Router();
const activitie = require("../models/activities.model");
const verify = require("./verifytoken");

//Creating new Activity by coordinator
router.post("/", verify, async (req, res) => {
  let datetime = new Date();
  //First Time inParticipant
  if (req.body.Inpatrticipant) {
    req.body.Inpatrticipant = datetime;
    const activit = new activitie({
      Participant: req.body.Participant,
      Inpatrticipant: req.body.Inpatrticipant,
      Outparticipant: req.body.Outparticipant,
      Foodcoupon: req.body.Foodcoupon,
      Event: req.body.Event_id,
    });
    try {
      const savedActivite = await activit.save();
      res.json(savedActivite);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    if (req.body.Outpatrticipant) {
      console.log(req.body.Outpatrticipant);
      const acti = await activitie.findOneAndUpdate(
        { Participant: req.body.Participant },
        {
          $set: { Outparticipant: datetime },
        },
        {useFindAndModify: false}
      );
      console.log(acti);
      res.json("Updated Settings Done");
    } else if (req.body.FoodCoupon) {
      const acti = await activitie.findOneAndUpdate(
        { Participant: req.body.Participant },
        {
          $set: { Foodcoupon: datetime },
        }
      );
      console.log(acti);
      res.json("Updated Settings Done");
    }

    
  }
});

//Getting Activity Details by coordinator
router.get("/details", verify, async (req, res) => {
  console.log(req.query.params);
  const acti = await activitie.findOne({ Participant: req.query.params });
  if (acti) {
    console.log(acti);
    res.json(acti);
  } else {
    res.json({ message: "DoesnotExist" });
  }
});

module.exports = router;
