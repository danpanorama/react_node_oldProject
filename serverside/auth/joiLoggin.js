const joi = require("@hapi/joi");

// login validation
const loginschema = joi.object({
  name: joi.string().min(4).required().messages({
    "string.pattern": "user name  is unvalid",
    "string.min": "user name  is short (big then 4)",
  }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": "password  is unvalid to the ruls",
    }),
  remember: joi.bool(),
});
// function start
const loginvalidation = (data) => {
  return loginschema.validateAsync(data, { abortEarly: false });
};

module.exports.loginvalidation = loginvalidation;

// error(() => new Error('email must be an email'))
