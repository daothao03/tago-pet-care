const caregiverController = require("../../controllers/frontend/caregiverController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/caregiver-request", caregiverController.caregiverRequest);
router.get("/caregiver-info/:userId", caregiverController.getInfoCaregiver);

module.exports = router;
