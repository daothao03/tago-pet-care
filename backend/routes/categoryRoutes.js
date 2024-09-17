const categoryController = require("../controllers/categoryController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-category", authMiddleware, categoryController.addCategory);
router.put(
    "/update-category",
    authMiddleware,
    categoryController.updateCategory
);
router.put(
    "/update-category-status",
    authMiddleware,
    categoryController.updateChangeStatus
);
router.delete(
    "/delete-category/:cateId",
    authMiddleware,
    categoryController.deleteCategory
);
router.get("/get-category", authMiddleware, categoryController.getCategory);
router.get(
    "/get-category-id/:cateId",
    authMiddleware,
    categoryController.getCategoryId
);

module.exports = router;
