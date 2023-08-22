const UserModel = require("../models/users");
const { generateHashedPassword } = require("../utils/encryptPassword");
const mongoose = require("mongoose");
async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Blog Id" });
    }
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          isActive: false,
        },
      },
      { new: true }
    );
    res.send({ massage: "User Deleted Successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
async function createUser(req, res) {
  try {
    const { userName, password } = req.body;
    hashedPassword = await generateHashedPassword(password);
    const newUser = new UserModel({
      userName,
      password: hashedPassword,
    });
    await newUser.save();
    res.send({ massage: "user Created Successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Blog Id" });
    }
    const { userName, password } = req.body;
    hashedPassword = await generateHashedPassword(password);
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          userName: userName,
          password: hashedPassword,
        },
      },
      { new: true }
    );
    res.send({ massage: "User Updated Successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function getUser(req, res) {
  try {
    let users = await UserModel.find({
      isActive: true,
      isAdmin: false,
    });
    return res.json({ status: "success", data: users });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser,
};
