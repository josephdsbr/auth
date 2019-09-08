const Joi = require('@hapi/joi');

/* User Register Validation */

const registerValidation = body => {

  /* Creating a validation module for registering */

  const SchemaValidation = {
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  }

  /* Verifying if our request body follows the model pre-defined */

  return Joi.validate(body, SchemaValidation);
}

/* User Login Validation */

const loginValidation = body => {

  /* Creating a validation module for login */

  const SchemaValidation = {
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  }
  /* Verifying if our request body follows the model pre-defined */
  return Joi.validate(body, SchemaValidation);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;