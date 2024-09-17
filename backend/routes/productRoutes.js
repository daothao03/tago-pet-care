const productController = require("../controllers/productController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-product", authMiddleware, productController.add_product);
router.put("/update-product", authMiddleware, productController.update_product);
router.put(
    "/update-product-status",
    authMiddleware,
    productController.update_status
);
router.get("/get-products", authMiddleware, productController.get_product);
router.get(
    "/get-product-id/:productId",
    authMiddleware,
    productController.get_product_id
);
router.delete(
    "/delete-product/:productId",
    authMiddleware,
    productController.delete_product
);

module.exports = router;
