const caregiverBEController = require("../controllers/caregiverBEController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get(
    "/get-caregiver-request",
    authMiddleware,
    caregiverBEController.get_caregiver_request
);
router.get(
    "/get-caregiver-info/:careId",
    authMiddleware,
    caregiverBEController.get_caregiver_info
);
router.put(
    "/update-role-status",
    authMiddleware,
    caregiverBEController.update_role_status
);
router.put(
    "/update-profile",
    authMiddleware,
    caregiverBEController.update_profile
);

module.exports = router;
