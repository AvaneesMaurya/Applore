const { Router } = require("express");
const router = Router();

const verifyToken = require("../middlewares/verifyAuthToken");

const {
  createUser,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/userControllers");
const {
  createUserValidation,
  updateUserValidation,
} = require("../middlewares/userValidation");

router.post("/user/create", verifyToken, createUserValidation, createUser);
router.put(
  "/user/update/:userId",
  verifyToken,
  updateUserValidation,
  updateUser
);
router.get("/user/get", verifyToken, getUser);
router.delete("/user/delete/:userId", verifyToken, deleteUser);

module.exports = router;
