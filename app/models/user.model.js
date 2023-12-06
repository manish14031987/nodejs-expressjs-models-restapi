//const sql = require("../config/connection");
const Sequelize = require("sequelize");

const User = (sequelize, Sequelize) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      social_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      income_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      income_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      assets: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      device_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      device_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      remember_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      auth_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_login: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      verify_otp: {
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

module.exports = User;
