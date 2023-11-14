const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helpers");

const {
  Sequelize,
  ValidationErrorItem,
  ValidationError,
} = require("sequelize");

exports.createReader = (req, res) => createItem(res, "reader", req.body);

exports.getAllReaders = (_, res) => getAllItems(res, "reader");

exports.getReaderById = (req, res) => getItemById(res, "reader", req.params);

exports.updateReaderEmail = (req, res) =>
  updateItem(res, "reader", req.body, req.params.id);

exports.deleteReaderById = (req, res) =>
  deleteItem(res, "reader", req.params.id);
