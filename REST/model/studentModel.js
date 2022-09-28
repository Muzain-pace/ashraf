const mongoose = require("mongoose");

let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const studentschema = new mongoose.Schema({
  semId: {
    required: true,
    type: ObjectId,
  },
  usn: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  totalmarks: {
    required: true,
    type: Number,
  },
  percentage: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Student", studentschema);
