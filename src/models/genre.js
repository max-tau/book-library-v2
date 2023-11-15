module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
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

  const GenreModel = connection.define("Genre", schema);
  return GenreModel;
};
