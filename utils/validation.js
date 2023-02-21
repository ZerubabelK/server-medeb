const Joi = require("@hapi/joi");

// Register validation
module.exports = {
  registerValidation: (data) => {
    const schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    });
    return schema.validate(data);
  },

  signinValidation: (data) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    });
    return schema.validate(data);
  },
  pinValidation: (data) => {
    const schema = Joi.object({
      pin: Joi.string().required().min(4).max(4),
    });
    return schema.validate(data);
  },
};
