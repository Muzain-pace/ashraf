const mongoose = require("mongoose");

const semschema = new mongoose.Schema({
  batch: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Batch", semschema);
