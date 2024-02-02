const Joi = require("joi");

const getRoleSchema = () => {
  return Joi.object({
    id: Joi.number().presence("required"),
    name: Joi.string().max(50).presence("required"),
  });
};

const validateRole = (req, res, next) => {
  const schema = getRoleSchema();

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

module.exports = validateRole;
