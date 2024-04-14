const Book = require('../models/bookmodel');

const fetchAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postBook = async (req, res) => {
  const { title, author, genre, summary, reviews } = req.body;

  if (
    !title ||
    !author ||
    !genre ||
    !summary ||
    !reviews ||
    !Array.isArray(reviews)
  ) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      summary,
      reviews,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { fetchAllBooks, postBook };
