const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing required email field",
  }),
  subscription: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing required email field",
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing required email field",
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.valid("starter", "pro", "business").required().messages({
    "any.required": "Missing field subscription",
    "any.only": "Invalid subscription value",
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
