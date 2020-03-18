const mongoose = require('mongoose');

const CoordinatorSchema = mongoose.Schema({

    name:{
        type:String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type:String,
        required: true,
        min: 6,
        max: 255
    },
    password:{
        type:String,
        required: true,
        min: 6,
        max: 255
    },
    companyname:{
        type:String,
        required: false,
    },
    date:{
        type : Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Coordinator',CoordinatorSchema);