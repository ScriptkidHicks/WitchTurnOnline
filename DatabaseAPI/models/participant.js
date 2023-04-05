const mongoose = require("mongoose");

const Participant = new mongoose.Schema({
  characterName: String,
  imageSource: String,
  initiative: Number,
  bonus: Number,
  armorClass: Number,
  isHidden: Boolean,
  reactionUsed: Boolean,
});

module.exports = mongoose.model("Participant", Participant);
