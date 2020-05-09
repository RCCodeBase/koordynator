const mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  EventType: {
    type: String,
  },
  Volunteer: {
    type: String,
  },
  ParticipantSettings: {
    type: String,
    required: false,
  },
  Coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coordinator",
  },
  ActiviteSettings: {
    type: String,
  },
});

module.exports = mongoose.model("Events", eventSchema);
