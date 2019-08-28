const Joi = require('@hapi/joi');

/* User Register Validation */

const registerValidation = body => {
  const Joi = require('@hapi/joi');

  const SchemaValidation = {
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  }

  return Joi.validate(body, SchemaValidation);
}

const loginValidation = body => {
  const Joi = require('@hapi/joi');

  const SchemaValidation = {
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  }

  return Joi.validate(body, SchemaValidation);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;