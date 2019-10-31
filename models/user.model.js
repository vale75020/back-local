const Mongoose = require('mongoose');
const Joigoose = require('joigoose')(Mongoose);
const Joi = require('joi');


var joiUserSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  password: Joi.string().min(4).max(30).required(),
  admin: Joi.boolean(),
  // access_token: [
  //   Joi.string(),
  //   Joi.number()
  // ],
});

var mongooseUserSchema = new Mongoose.Schema(Joigoose.convert(joiUserSchema));

module.exports = User = Mongoose.model('users', mongooseUserSchema);

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   admin: {
//     type: Boolean,
//     default: false
//   }
// });

// module.exports = User = mongoose.model("users", userSchema);
