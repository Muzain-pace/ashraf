const mongoose = require("mongoose");

const batchschema = new mongoose.Schema({
  batch: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Batch", batchschema);
