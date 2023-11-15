const express = require("express");
const genreController = require("../controllers/genre");

const genreRouter = express.Router();

genreRouter
  .post("/", genreController.createGenre)
  .get("/", genreController.getAllGenres)
  .get("/:id", genreController.getBooksByGenre);

module.exports = genreRouter;
