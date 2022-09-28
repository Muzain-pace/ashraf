const mongoose = require("mongoose");
let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const semschema = new mongoose.Schema({
  batchId: {
    required: true,
    type: ObjectId,
  },
  sem: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Sem", semschema);
