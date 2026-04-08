const express = require("express");
const {
  addOrUpdateRating,
  getRatingsByRemedy,
} = require("../controllers/rating.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/remedy/:remedyId", getRatingsByRemedy);
router.post("/", protect, addOrUpdateRating);

module.exports = router;
