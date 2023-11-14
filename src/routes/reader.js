const express = require("express");
const readerController = require("../controllers/reader");

const readerRouter = express.Router();

readerRouter
  .post("/", readerController.create)
  .get("/", readerController.getAll)
  .get("/:id", readerController.getById)
  .patch("/:id", readerController.updateEmail)
  .delete("/:id", readerController.delete);

module.exports = readerRouter;
