const mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    Title     : {
        type:String,
        required: true
    },
    Description : {
        type:String,
        required: true
    },
    EventType  : {
        type:String
    },
    Volunteer:{
        type:String
    },
    Coordinator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "coordinator"
    }
    
});

module.exports = mongoose.model('Events',eventSchema);