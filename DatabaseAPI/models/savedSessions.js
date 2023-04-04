const mongoose = require("mongoose");

const savedSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
