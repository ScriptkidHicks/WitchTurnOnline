const mongoose = require("mongoose");
const IndividualSavedSession = require("./savedIndividualSession");

const savedSessionsSchema = new mongoose.Schema({
  playerName: String,
  savedSessions: [IndividualSavedSession],
});

module.exports = mongoose.model("SavedSessionsSchema", savedSessionsSchema);
