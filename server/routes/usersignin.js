const router = require('express').Router();
const Coordinator = require('../models/coordinator.model');
const verify = require("./verifytoken");

//Creating new Coordinator
router.get('/coordinator', verify,async (req, res) => {

    const emailExist = await Coordinator.findOne({ email: req.user.email });
    if (emailExist) return res.json('Already Registered Email');

    const Coordinatorperson = new Coordinator({
        UserId: req.user.uid,
        email: req.user.email
    });
    try {
        const savedCoordinator = await Coordinatorperson.save();
        res.json(savedCoordinator);
        // res.json('Logged In');
    }
    catch (err) {
        res.json({ message: err });
    }


});

module.exports = router;