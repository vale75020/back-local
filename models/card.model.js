const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "to validate"
  },
  date: {
    type: Date,
    default: new Date()
  }  
});

module.exports = Card = mongoose.model("cards", cardSchema);
