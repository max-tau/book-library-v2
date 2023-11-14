const express = require("express");
const readerController = require("../controllers/reader");

const readerRouter = express.Router();

readerRouter
  .post("/", readerController.createReader)
  .get("/", readerController.getAllReaders)
  .get("/:id", readerController.getReaderById)
  .patch("/:id", readerController.updateReaderEmail)
  .delete("/:id", readerController.deleteReaderById);

module.exports = readerRouter;
