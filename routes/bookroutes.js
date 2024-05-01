const express = require("express");
const router = express.Router();
const booksController = require("../controller/booksController");

// Route to get all books
router.get("/getall-books", booksController.fetchAllBooks);
router.get("/getbook", booksController.fetchBooksByName);
router.get("/book-recommendations", booksController.getBookRecommendations);

// NOTE Post is Admin Route
router.post("/register-book", booksController.postBook);

module.exports = router;
