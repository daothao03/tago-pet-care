const cartController = require("../../controllers/frontend/cartController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-to-cart", cartController.add_to_cart);
router.get("/get-cart/:userId", cartController.get_cart);
router.delete("/delete-cart-item/:productId", cartController.delete_cart_item);
router.put("/inc-quantity-cart/:cart_id", cartController.inc_qty);
router.put("/des-quantity-cart/:cart_id", cartController.des_qty);

module.exports = router;
