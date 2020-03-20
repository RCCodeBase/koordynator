const router = require('express').Router();
const jwt =   require('jsonwebtoken');
const Coordinator = require('../models/coordinator.model');
const verify = require('./verifyToken');

//Creating new event by coordinator
router.post('/coordinator', verify, async (req, res) => {
console.log(res.body);
});

module.exports = router;