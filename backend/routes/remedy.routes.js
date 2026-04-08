const express = require("express");
const {
  addRemedy,
  getRemedyById,
  getRemedyIngredients,
  getRemedies,
} = require("../controllers/remedy.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getRemedies);
router.get("/:id", getRemedyById);
router.get("/:id/ingredients", getRemedyIngredients);
router.post("/", protect, addRemedy);

module.exports = router;
