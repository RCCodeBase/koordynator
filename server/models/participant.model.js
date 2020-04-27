const mongoose = require("mongoose");

var participantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
  },
  age: {
    type: String,
  },
  company: {
    type: String,
  },
  education: {
    type: String,
  },
  PaymentData: {
    type: String,
  },
  address:{
    type: String,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },
});

module.exports = mongoose.model("Participant", participantSchema);
