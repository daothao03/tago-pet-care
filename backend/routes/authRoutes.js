const authController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

//DASHBOARD
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/get-information", authMiddleware, authController.getInfo);
router.get("/logout", authMiddleware, authController.logout);

module.exports = router;
