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
      account_name : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      account_number : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      account_balance : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      account_holder_name	: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      iban : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      swift_code : {
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

module.exports = UserAccount;
