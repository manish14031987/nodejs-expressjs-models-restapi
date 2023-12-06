//const sql = require("../config/connection");
const Sequelize = require("sequelize");

const Modelhasrole = (sequelize, Sequelize) => {
  return sequelize.define(
    "model_has_roles",
    {
      role_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      model_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      model_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Modelhasrole;
