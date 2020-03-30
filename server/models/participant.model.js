const mongoose = require('mongoose');

var participantSchema = mongoose.Schema({
    name   : {
        type:String,
        required: true
    },
    email : {
        type:String,
        required: true
    },
    company:{
        type:String
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events"
    }
});

module.exports = mongoose.model('Participant',participantSchema);