const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.pattern.base": "Name must contain only letter",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 30 characters",
    }),

  email: Joi.string()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
  .min(6)
  .required()
  .messages({
    "string.min": "Password must be at least 6 character",
    "string.empty": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
  .trim()
  .lowercase()
  .email()
  .required(),

  password: Joi.string()
  .required(),
});

module.exports = { registerSchema, loginSchema };
