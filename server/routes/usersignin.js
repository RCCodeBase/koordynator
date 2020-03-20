const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =   require('jsonwebtoken');
const Coordinator = require('../models/coordinator.model');
const { loginValidation } = require('./validation');

//Creating new Coordinator
router.post('/coordinator', async (req, res) => {

    //Validate the data before a user register
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already registered
    const user = await Coordinator.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not registered');

    //Checking Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password is not valid');

    //create and assign a token
    const Token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
    res.setHeader('token',Token);
    res.send();
    // res.json('Logged In');

});

module.exports = router;