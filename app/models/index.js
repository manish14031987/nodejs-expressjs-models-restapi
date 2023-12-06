const dbConfig = require("../config/db.config");

//create Sequelize Object
const Sequelize = require("sequelize");

// Create Database Connection Object
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;


db.user = require("./user.model")(sequelize, Sequelize);
db.user_account = require("./user_account.model")(sequelize, Sequelize);
db.model_has_role = require("./model_has_role.model")(sequelize, Sequelize);
db.user_notification = require("./user_notification.model")(sequelize, Sequelize);
db.category = require("./category.model")(sequelize, Sequelize);

module.exports = db;
