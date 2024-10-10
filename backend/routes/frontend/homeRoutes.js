const homeController = require("../../controllers/frontend/homeController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

//FRONTEND
router.get("/home/get-categories", homeController.get_categories);
router.get("/home/price-range-product", homeController.get_price_range_product);
router.get("/home/query-products", homeController.query_products);
router.get("/home/query-services", homeController.query_services);
router.get(
    "/home/get-service-details/:slug",
    homeController.get_service_details
);

module.exports = router;
