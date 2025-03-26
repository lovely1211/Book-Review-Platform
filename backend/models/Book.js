const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  rating: Number,
});

const reviewSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
});

module.exports = {
  Book: mongoose.model("Book", bookSchema),
  Review: mongoose.model("Review", reviewSchema),
};