//const sql = require("../config/connection");
const Sequelize = require("sequelize");

const UserNotification = (sequelize, Sequelize) => {
  return sequelize.define(
    "user_notifications",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      msg: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_read: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
    {
      timestamps: false,
    }
  );
};

module.exports = UserNotification;
