const jwt = require("jsonwebtoken");
const dev = require("../config/dev");
const UserModel = require("../models/users");

module.exports = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";

    const accessToken = req.cookies.JWT_TOKEN || bearerToken;

    if (accessToken === "null") {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(accessToken, dev.JWT_SECRET_TOKEN, async (err, payload) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      req.user = await UserModel.findById({ _id: payload.id });
      if (!req.user || (req.user && req.user.isDeleted)) {
        return res.status(401).json({ message: "Unauthorized: Invalid User." });
      }

      next();
    });
  } catch (error) {
    return res.status(422).json(error.message);
  }
};
