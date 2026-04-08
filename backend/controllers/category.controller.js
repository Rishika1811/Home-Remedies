const Category = require("../models/category.model");

const getCategories = async (_req, res) => {
  try {
    const categories = await Category.find().sort({ category_name: 1 });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch categories.", error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "category_name is required." });
    }

    const existingCategory = await Category.findOne({ category_name });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists.", category: existingCategory });
    }

    const category = await Category.create({ category_name, description });
    return res.status(201).json({ message: "Category created successfully.", category });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create category.", error: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
