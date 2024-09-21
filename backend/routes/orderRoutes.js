const orderController = require("../controllers/orderController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

//DASHBOARD
router.post("/place-order", orderController.place_order);

module.exports = router;
