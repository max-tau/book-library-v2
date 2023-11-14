const { Reader } = require("../models");
const {
  Sequelize,
  ValidationErrorItem,
  ValidationError,
} = require("sequelize");

exports.create = async (req, res) => {
  try {
    const newReader = await Reader.create(req.body);
    res.status(201).json(newReader);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

exports.getAll = async (_, res) => {
  const readers = await Reader.findAll();
  res.status(200).json(readers);
};

exports.getById = async (req, res) => {
  const reader = await Reader.findByPk(req.params.id);

  if (!reader) {
    res.status(404).json({ error: "The reader could not be found." });
  }
  res.status(200).json(reader);
};

exports.updateEmail = async (req, res) => {
  const { id } = req.params;
  const [updatedReader] = await Reader.update(req.body, {
    where: { id },
  });

  if (!updatedReader) {
    res.status(404).json({ error: "The reader could not be found." });
  }
  res.status(200).json(updatedReader);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const deletedReader = await Reader.destroy({ where: { id } });

  if (!deletedReader) {
    res.status(404).json({ error: "The reader could not be found." });
  }
  res.status(204).json(deletedReader);
};
