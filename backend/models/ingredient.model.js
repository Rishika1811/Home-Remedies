const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    ingredient_name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    remedy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remedy",
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

ingredientSchema.index({ remedy_id: 1 });

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
