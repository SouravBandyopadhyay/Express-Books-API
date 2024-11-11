const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, maxlength: 500 },
}, { timestamps: true });

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, default: "General" },
  summary: { type: String, maxlength: 1000 },
  img_url: { type: String, default: "https://www.horizonplant.com/wp-content/uploads/2017/05/placeholder-400x400.png" },
  reviews: [reviewSchema],
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

// Virtual for review count
bookSchema.virtual("reviewCount").get(function() {
  return this.reviews.length;
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
