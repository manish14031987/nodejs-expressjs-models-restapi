//const sql = require("../config/connection");
const Sequelize = require("sequelize");

const UserAccount = (sequelize, Sequelize) => {
  return sequelize.define(
    "user_accounts",
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
      user_account_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      share_id: {
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

module.exports = UserAccount;
