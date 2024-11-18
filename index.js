const dotenv = require("dotenv").config();
dotenv;
const express = require("express");
const { resolve } = require("path");
const morgan = require("morgan");
const cors = require("cors");
const booksAPI = require("./routes/bookroutes.js");
const connectDB = require("./Config/db.js");
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

// HEALTH CHECK ROUTE
app.get("/health-check", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// ROUTES
app.use("/api/books/", booksAPI);

// Database Connection
connectDB();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
