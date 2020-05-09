const mongoose = require('mongoose');

const AcivititesSchema = mongoose.Schema({

    Participant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "participant",
    },
    Inpatrticipant:{
        type : Date,
        required: false
    },
    Outparticipant:{
        type : Date,
        required: false
    },
    Foodcoupon:{
        type : Date,
        required: false
    },
    Event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
      },
});

module.exports = mongoose.model('Activites',AcivititesSchema);
