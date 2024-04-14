const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: String,
  rating: Number,
  comment: String,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  summary: String,
  reviews: [reviewSchema],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
