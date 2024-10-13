const paymentController = require("../controllers/payment/paymentController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get(
    "/payment/create-stripe-connect-account",
    authMiddleware,
    paymentController.create_stripe_connect_account
);
router.put(
    "/payment/active-stripe-connect-account/:activeCode",
    authMiddleware,
    paymentController.active_stripe_connect_account
);
router.post("/payment/create-payment", paymentController.create_payment);
router.get(
    "/payment/caregiver-payment-details/:caregiverId",
    authMiddleware,
    paymentController.get_seller_payment_details
);
router.post(
    "/payment/caregiver-request-withdraw",
    authMiddleware,
    paymentController.withdrawal_request
);
router.get(
    "/payment/request",
    authMiddleware,
    paymentController.get_payment_request
);
router.post(
    "/payment/request-confirm",
    authMiddleware,
    paymentController.confirm_request_payment
);
module.exports = router;
