//const sql = require("../config/connection");
const Sequelize = require("sequelize");

const Category = (sequelize, Sequelize) => {
  return sequelize.define(
    "categories",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      image : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Category;
