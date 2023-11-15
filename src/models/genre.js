const { DataTypes } = require("sequelize");

module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "Genre must be specified",
        },
      },
      notEmpty: {
        args: true,
        msg: "Genre must be specified",
      },
    },
  };

  return connection.define("Genre", schema);
};
