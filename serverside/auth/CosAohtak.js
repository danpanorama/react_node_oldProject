const joi = require("@hapi/joi");

const creatschema = joi.object({
  name: joi
    .string()
    .min(4)
    .required()
    .pattern(new RegExp("^[a-z]"))
    .messages({
      "string.pattern.base": `"username" should be a type of 'text'`,
      "string.min": `"username" minimum 4 `,
    }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": `"password" minimum 8 max 30`,
      "any.required": `"password"  must be  `,
    }),
  phon: joi.number().required().messages({
    "any.required": `"phon" must have`,
  }),
 view: joi.required(),
  email: joi.string().email().required().messages({
    "string.email": `"email" must be an email`,
  }),
  number: joi.number(),
  firstName: joi.string()
  
});
// function start
const cosAohtak = (data) => {
  return creatschema.validateAsync(data, { abortEarly: false });
};

module.exports.cosAohtak = cosAohtak;
