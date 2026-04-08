const express = require("express");
const { createCategory, getCategories } = require("../controllers/category.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, createCategory);

module.exports = router;
