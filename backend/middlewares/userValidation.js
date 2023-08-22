const joi = require("joi");

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const userSchema = joi.object({
  userName: joi.string().trim(),
  password: joi.string(),
});

function createUserValidation(req, res, next) {
  const newSchema = userSchema.fork(["userName", "password"], (elm) =>
    elm.required()
  );
  const { error, value } = newSchema.validate(req.body, options);

  if (error) {
    return res
      .status(400)
      .send(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
  }
  req.body = value;
  next();
}

function updateUserValidation(req, res, next) {
  const { error, value } = userSchema.validate(req.body, options);

  if (error) {
    return res
      .status(400)
      .send(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
  }
  req.body = value;
  next();
}

module.exports = { createUserValidation, updateUserValidation };
