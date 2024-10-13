const orderController = require("../controllers/orderController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/place-order", orderController.place_order);
router.post("/place-order-service", orderController.place_order_service);

//DASHBOARD
router.get(
    "/caregiver/get-caregiver-orders/:caregiverId",
    authMiddleware,
    orderController.get_caregiver_orders
);
router.get(
    "/caregiver/get-caregiver-orders-service/:caregiverId",
    authMiddleware,
    orderController.get_caregiver_orders_service
);
router.get(
    "/caregiver/get-orderProduct-detail/:orderId",
    authMiddleware,
    orderController.get_orderP_detail
);
router.get(
    "/caregiver/get-orderService-detail/:orderServiceId",
    authMiddleware,
    orderController.get_orderS_detail
);

//DASHBOARD FRONTEND
router.get(
    "/get-order-by-user/:customerId/:status",
    orderController.get_order_by_user
);

router.get("/order/confirm/:orderId", orderController.order_confirm);

module.exports = router;
