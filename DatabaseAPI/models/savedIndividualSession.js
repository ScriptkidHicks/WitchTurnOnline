const mongoose = require("mongoose");
const ParticipantSchema = require("./participant");

const IndividualSavedSessionSchema = new mongoose.Schema({
  sessionName: String,
  individualSession: [ParticipantSchema],
});

module.exports = IndividualSavedSessionSchema;
