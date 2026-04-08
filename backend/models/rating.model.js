const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: "",
      trim: true,
    },
    rating_date: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

ratingSchema.index({ remedy_id: 1 });
ratingSchema.index({ user_id: 1 });
ratingSchema.index({ user_id: 1, remedy_id: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
