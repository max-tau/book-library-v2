const { Book } = require("../models");

exports.create = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

exports.getAll = async (_, res) => {
  const bookList = await Book.findAll();
  res.status(200).json(bookList);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const selectedBook = await Book.findByPk(id);

  res.status(200).json(selectedBook);
};

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
