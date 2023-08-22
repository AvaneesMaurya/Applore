const joi = require("joi");

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const blogsSchema = joi.object({
  title: joi.string().trim(),
  content: joi.string(),
});

function createBlogsValidation(req, res, next) {
  const newBlogsSchema = blogsSchema.fork(["title", "content"], (elm) =>
    elm.required()
  );
  const { error, value } = newBlogsSchema.validate(req.body, options);

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

function updateBlogsValidation(req, res, next) {
  const { error, value } = blogsSchema.validate(req.body, options);

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

module.exports = { createBlogsValidation, updateBlogsValidation };
