const serviceController = require("../controllers/serviceController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-service", authMiddleware, serviceController.add_service);
router.get("/get-services", authMiddleware, serviceController.get_service);
router.get(
    "/get-service-id/:serviceId",
    authMiddleware,
    serviceController.get_service_id
);
router.put("/update-service", authMiddleware, serviceController.update_service);
router.put(
    "/update-service-status",
    authMiddleware,
    serviceController.update_status
);
router.delete(
    "/delete-service/:serviceId",
    authMiddleware,
    serviceController.delete_service
);

module.exports = router;
