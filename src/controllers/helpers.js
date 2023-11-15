const { Book, Reader, Genre } = require("../models");

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    genre: Genre,
  };

  return models[model];
};

const get404error = (model) => ({
  error: `The ${model} could not be found.`,
});

const deletePassword = (obj) => {
  if (obj.password) {
    delete obj.password;
  }

  return obj;
};

exports.createItem = async (res, model, item) => {
  const Model = getModel(model);
  try {
    const newItem = await Model.create(item);

    const newItemNoPassword = deletePassword(newItem.dataValues);

    res.status(201).json(newItemNoPassword);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getAllItems = async (res, model) => {
  const Model = getModel(model);
  const itemList = await Model.findAll();
  const itemsNoPassword = itemList.map((item) => {
    return deletePassword(item.get());
  });
  res.status(200).json(itemsNoPassword);
};

exports.getAllBooks = async (res, model, itemId) => {
  const Model = getModel(model);

  const items = await Model.findAll({ where: { id: itemId }, include: Book });
  res.status(200).json(items);
};

exports.getItemById = async (res, model, item) => {
  const Model = getModel(model);
  const { id } = item;

  const selectedItem = await Model.findByPk(id, { include: Genre });

  if (!selectedItem) {
    res.status(404).json(get404error(model));
  } else {
    const itemNoPassword = deletePassword(selectedItem.dataValues);
    res.status(200).json(itemNoPassword);
  }
};

exports.updateItem = async (res, model, item, id) => {
  const Model = getModel(model);

  const [updatedItems] = await Model.update(item, { where: { id } });

  if (!updatedItems) {
    res.status(404).json(get404error(model));
  } else {
    const updatedItem = await Model.findByPk(id);
    const updatedItemNoPassword = deletePassword(updatedItem.dataValues);
    res.status(200).json(updatedItemNoPassword);
  }
};

exports.deleteItem = async (res, model, id) => {
  const Model = getModel(model);

  const deletedItem = await Model.destroy({ where: { id } });

  if (!deletedItem) {
    res.status(404).json(get404error(model));
  } else {
    res.status(204).send();
  }
};
