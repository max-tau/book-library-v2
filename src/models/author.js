const { DataTypes } = require("sequelize");

module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "Author must be specified",
        },
      },
      notEmpty: {
        args: true,
        msg: "Author must be specified",
      },
    },
  };

  return connection.define("Author", schema);
};
