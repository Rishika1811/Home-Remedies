const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: false,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
