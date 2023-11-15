const { createItem, getAllItems, getAllBooks } = require("./helpers");
const {
  Sequelize,
  ValidationErrorItem,
  ValidationError,
} = require("sequelize");

exports.createGenre = (req, res) => {
  createItem(res, "genre", req.body);
};

exports.getAllGenres = (_, res) => getAllItems(res, "genre");

exports.getBooksByGenre = (req, res) =>
  getAllBooks(res, "genre", req.params.id);
