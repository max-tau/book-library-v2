const {
  createItem,
  getAllItems,
  getItemById,
  deleteItem,
} = require("./helpers");
const { Book } = require("../models");

exports.createBook = (req, res) => createItem(res, "book", req.body);

exports.getAllBooks = (_, res) => getAllItems(res, "book");

exports.getBookById = (req, res) => getItemById(res, "book", req.params);

exports.deleteBookById = (req, res) => deleteItem(res, "book", req.params.id);

exports.getByTitle = async (req, res) => {
  const searchTitle = req.params.title;
  const booksByTitle = await Book.findAll({
    where: { title: searchTitle },
  });

  res.status(200).json(booksByTitle);
};

exports.getByAuthor = async (req, res) => {
  const searchAuthor = req.params.author;
  const booksByAuthor = await Book.findAll({
    where: { author: searchAuthor },
  });

  res.status(200).json(booksByAuthor);
};

exports.getByGenre = async (req, res) => {
  const searchGenre = req.params.genre;
  const booksByGenre = await Book.findAll({
    where: { genre: searchGenre },
  });

  res.status(200).json(booksByGenre);
};

exports.getByISBN = async (req, res) => {
  const searchISBN = req.params.ISBN;
  const booksByISBN = await Book.findAll({
    where: { ISBN: searchISBN },
  });

  res.status(200).json(booksByISBN);
};
