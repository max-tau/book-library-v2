module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please enter the book's title`,
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please enter the book's author`,
        },
      },
    },
    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define("Book", schema);
  return BookModel;
};
