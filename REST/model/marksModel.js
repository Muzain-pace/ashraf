const mongoose = require("mongoose");

let Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const marksschema = new mongoose.Schema({
  semId: {
    required: true,
    type: ObjectId,
  },
  subId: {
    required: true,
    type: ObjectId,
  },
  studentId: {
    required: true,
    type: ObjectId,
  },
  ia: {
    required: true,
    type: Number,
  },
  ea: {
    required: true,
    type: Number,
  },
  totalMarksPerSubject: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Marks", marksschema);
