const express = require("express");
const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter
  .post("/", bookController.createBook)
  .get("/", bookController.getAllBooks)
  .get("/:id", bookController.getBookById)
  .get("/titlesearch/:title", bookController.getByTitle)
  .get("/authorsearch/:author", bookController.getByAuthor)
  .get("/genresearch/:genre", bookController.getByGenre)
  .get("/ISBNsearch/:ISBN", bookController.getByISBN)
  .delete("/:id", bookController.deleteBookById);

module.exports = bookRouter;
