const { Router } = require("express");
const router = Router();

const { loginValidation } = require("../middlewares/authValidation");

const { login_post, logout_get } = require("../controllers/authControllers");
router.post("/auth/login", loginValidation, login_post);
router.get("/auth/logout", logout_get);

module.exports = router;
