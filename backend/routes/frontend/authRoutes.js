const authController = require("../../controllers/frontend/authController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

//FRONTEND
router.post("/user-register", authController.register);
router.post("/user-login", authController.login);
router.get("/user/logout", authController.logout);

module.exports = router;
