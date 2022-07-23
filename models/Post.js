//this file, is to connect everything together
//Connection to MYSQL that is in the connection.js and model/datatypes from the sequelize package
//creates a POST table within columns we identified,
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create our Post model
class Post extends Model {}

//create fields/columns for Post models
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    post_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

//pushes into the models/index.js
module.exports = Post;
