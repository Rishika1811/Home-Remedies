const Remedy = require("../models/remedy.model");
const Rating = require("../models/rating.model");

const getRatingsByRemedy = async (req, res) => {
  try {
    const ratings = await Rating.find({ remedy_id: req.params.remedyId })
      .populate("user_id", "username email role")
      .sort({ rating_date: -1 });

    const average = ratings.length
      ? ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length
      : 0;

    return res.status(200).json({
      count: ratings.length,
      average_rating: Number(average.toFixed(1)),
      ratings,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch ratings.", error: error.message });
  }
};

const addOrUpdateRating = async (req, res) => {
  try {
    const { remedy_id, score, comment = "" } = req.body;

    if (!remedy_id || !score) {
      return res.status(400).json({ message: "remedy_id and score are required." });
    }

    const remedy = await Remedy.findById(remedy_id);
    if (!remedy) {
      return res.status(404).json({ message: "Remedy not found." });
    }

    const existingRating = await Rating.findOne({
      user_id: req.user._id,
      remedy_id,
    });

    let rating;

    if (existingRating) {
      existingRating.score = score;
      existingRating.comment = comment;
      existingRating.rating_date = new Date();
      rating = await existingRating.save();
    } else {
      rating = await Rating.create({
        score,
        comment,
        user_id: req.user._id,
        remedy_id,
      });
    }

    const ratings = await Rating.find({ remedy_id });
    const average = ratings.length
      ? ratings.reduce((sum, item) => sum + item.score, 0) / ratings.length
      : 0;

    return res.status(existingRating ? 200 : 201).json({
      message: existingRating ? "Rating updated successfully." : "Rating added successfully.",
      rating,
      rating_summary: {
        average: Number(average.toFixed(1)),
        total_reviews: ratings.length,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save rating.", error: error.message });
  }
};

module.exports = {
  getRatingsByRemedy,
  addOrUpdateRating,
};
