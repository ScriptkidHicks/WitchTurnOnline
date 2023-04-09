const mongoose = require("mongoose");
const IndividualSavedSessionSchema = require("./savedIndividualSession");

const savedSessionsSchema = new mongoose.Schema({
  playerName: String,
  savedSessions: [IndividualSavedSessionSchema],
});

module.exports = mongoose.model("SavedSessionsSchema", savedSessionsSchema);
