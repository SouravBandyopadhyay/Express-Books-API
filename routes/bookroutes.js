const express = require('express');
const router = express.Router();
const booksController = require('../controller/booksController');

// Route to get all books
router.get('/getall-books', booksController.fetchAllBooks);
router.post('/register-book', booksController.postBook);
module.exports = router;
