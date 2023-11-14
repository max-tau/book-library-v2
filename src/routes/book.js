const express = require("express");
const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter
  .post("/", bookController.create)
  .get("/", bookController.getAll)
  .get("/:id", bookController.getById)
  .get("/titlesearch/:title", bookController.getByTitle)
  .get("/authorsearch/:author", bookController.getByAuthor)
  .get("/genresearch/:genre", bookController.getByGenre)
  .get("/ISBNsearch/:ISBN", bookController.getByISBN);

module.exports = bookRouter;
