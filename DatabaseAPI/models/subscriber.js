const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hashedPassword: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
