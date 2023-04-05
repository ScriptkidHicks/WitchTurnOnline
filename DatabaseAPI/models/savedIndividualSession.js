const mongoose = require("mongoose");
const Participant = require("./Participant");

const IndividualSavedSession = new mongoose.Schema({
  sessionName: String,
  individualSession: [Participant],
});

module.exports = mongoose.model(
  "IndividualSavedSession",
  IndividualSavedSession
);
