const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const dev = require("../config/dev");

async function login_post(req, res) {
  try {
    //Checking if username exists
    let userExist;

    const userName = req.body.userName;
    userExist = await User.findOne({
      username: { $regex: new RegExp("^" + userName + "$", "i") },
      isActive: true,
    });

    if (!userExist) {
      return res.status(400).json({
        message: "User account does not exist. Please check Username.",
      });
    }

    // If User is deleted then they should not be allowed to log-in.
    if (!userExist.isActive) {
      return res.status(400).json({ message: "User account does not exist." });
    }
    //Checking password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect." });
    }

    var expiresInDays = "1d";
    var expiresAt = new Date(Date.now() + 60 * 60 * 1000 * 24); //(minutes) * (seconds) * (miliseconds) * (hours)

    const jwtToken = jwt.sign({ id: userExist._id }, dev.JWT_SECRET_TOKEN, {
      expiresIn: expiresInDays,
    });

    res.cookie("JWT_TOKEN", jwtToken, {
      httpOnly: true,
      // secure: false, //Set to true when using https
      sameSite: true,
      expires: expiresAt,
    });

    const userData = {
      userId: userExist._id,
      userName: userExist.userName,
      isAdmin: userExist.isAdmin,
    };

    res.json({
      jwtToken,
      expiresIn: expiresAt,
      userData,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
function logout_get(req, res) {
  const accessToken = req.cookies.JWT_TOKEN;

  if (!accessToken) {
    return res.status(200).json({ message: "You are already logged out." });
  }

  res.cookie("JWT_TOKEN", "", { maxAge: 1 });
  res.json({ message: "Logged out successfully" });
}

module.exports = {
  login_post,
  logout_get,
};
