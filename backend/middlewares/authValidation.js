const joi = require("joi");

// schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

function loginValidation(req, res, next) {
  //Validation schema object
  const schema = joi.object({
    userName: joi.string().min(3).required(),
    password: joi.string().min(6).required(),
  });

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    return res
      .status(400)
      .send(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
  }

  // on success replace req.body with validated value and trigger next middleware function
  req.body = value;
  next();
}

module.exports = {
  loginValidation,
};
