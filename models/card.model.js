const Mongoose = require("mongoose");
const Joigoose = require("joigoose")(Mongoose);
const Joi = require("joi");

var joiCardSchema = Joi.object({
  user: Joi.string().meta({ type: "ObjectId", ref: "users" }),
  title: Joi.string()
    .min(4)
    .max(100)
    .required(),
  text: Joi.string()
    .min(4)
    .max(500)
    .required(),
  status: Joi.string().meta({ default: "to validate" }),
  date: Joi.string().meta({ default: new Date() })
});

var mongooseCardSchema = new Mongoose.Schema(Joigoose.convert(joiCardSchema));

module.exports = User = Mongoose.model("cards", mongooseCardSchema);
