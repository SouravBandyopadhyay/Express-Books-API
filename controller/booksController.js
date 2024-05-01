const Book = require("../models/bookmodel");

const fetchAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const totalBooks = await Book.countDocuments();
    const books = await Book.find().limit(limit).skip(startIndex);

    // Pagination result
    const pagination = {};

    if (endIndex < totalBooks) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      pagination.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    res.json({
      totalBooks: totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      books: books,
      pagination: pagination,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postBook = async (req, res) => {
  const { title, author, genre, summary, reviews, img_url } = req.body;

  if (
    !title ||
    !author ||
    !genre ||
    !summary ||
    !reviews ||
    !img_url ||
    !Array.isArray(reviews)
  ) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      summary,
      reviews,
      img_url,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fetchBooksByName = async (req, res) => {
  const bookName = req.params.title.toLowerCase(); // Convert provided string to lowercase

  try {
    // Use the lowercase book name for searching
    const books = await Book.find({
      title: { $regex: bookName, $options: "i" },
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// http://localhost:3010/api/books/book-recommendations?genre=Fiction
const getBookRecommendations = async (req, res) => {
  const { genre } = req.query; // You can add more parameters for filtering if needed

  try {
    let query = {};

    // If genre is provided, include it in the query
    if (genre) {
      query.genre = genre;
    }

    const totalBooks = await Book.countDocuments(query);

    // Get 5 random books
    const recommendations = await Book.aggregate([
      { $match: query },
      { $sample: { size: 5 } },
    ]);

    res.json({
      totalBooks,
      recommendations,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  fetchAllBooks,
  postBook,
  fetchBooksByName,
  getBookRecommendations,
};
