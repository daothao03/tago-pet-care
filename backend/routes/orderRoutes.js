const orderController = require("../controllers/orderController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/place-order", orderController.place_order);

//DASHBOARD
router.get(
    "/caregiver/get-caregiver-orders/:caregiverId",
    authMiddleware,
    orderController.get_caregiver_orders
);
router.get(
    "/caregiver/get-orderProduct-detail/:orderId",
    authMiddleware,
    orderController.get_orderP_detail
);

module.exports = router;
