const router = require('express').Router();
const Coordinator = require('../models/coordinator.model');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('./validation');

//Creating new Coordinator
router.post('/coordinator', async (req, res) => {


        //Validate the data before a user register
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const Coordinatorperson = new Coordinator({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            companyname: req.body.company
        });
        console.log(Coordinatorperson);
        try {
            const savedCoordinator = await Coordinatorperson.save();
            res.json(savedCoordinator);
        }
        catch (err) {
            res.json({ message: err });
        }
});

module.exports = router;