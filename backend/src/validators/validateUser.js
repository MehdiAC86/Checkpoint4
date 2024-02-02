const Joi = require("joi");

const getUserSchema = () => {
  return Joi.object({
    id: Joi.number().presence("required"),
    firstname: Joi.string().max(50).presence("required"),
    lastname: Joi.string().max(50).presence("required"),
    email: Joi.string().max(250).presence("required"),
    password: Joi.string().max(250).presence("required"),
    id_role: Joi.number().presence("optional"),
  });
};

const validateUser = (req, res, next) => {
  const schema = getUserSchema();

  const { error } = schema.validate(
    {
      ...req.body,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateUser;
