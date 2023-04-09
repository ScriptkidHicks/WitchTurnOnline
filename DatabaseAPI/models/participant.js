const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  characterName: String,
  imageSource: String,
  initiative: Number,
  bonus: Number,
  armorClass: Number,
  isHidden: Boolean,
  reactionUsed: Boolean,
});

module.exports = ParticipantSchema;
