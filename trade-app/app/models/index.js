const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Подключаем модели
db.brand       = require("./brand.model.js")(sequelize, Sequelize);
db.model       = require("./model.model.js")(sequelize, Sequelize);
db.automobile  = require("./automobile.model.js")(sequelize, Sequelize);
db.client      = require("./client.model.js")(sequelize, Sequelize);
db.priceList   = require("./price-list.model.js")(sequelize, Sequelize);
db.priceListItem = require("./price-list-item.model.js")(sequelize, Sequelize);
db.order       = require("./order.model.js")(sequelize, Sequelize);
db.orderItem   = require("./order-item.model.js")(sequelize, Sequelize);
db.delivery    = require("./delivery.model.js")(sequelize, Sequelize);

// Связи
db.brand.hasMany(db.model,      { foreignKey: "brandId" });
db.model.belongsTo(db.brand,    { foreignKey: "brandId" });

db.model.hasMany(db.automobile,     { foreignKey: "modelId" });
db.automobile.belongsTo(db.model,   { foreignKey: "modelId" });

db.client.hasMany(db.order,     { foreignKey: "clientId" });
db.order.belongsTo(db.client,   { foreignKey: "clientId" });

db.order.hasMany(db.orderItem,      { foreignKey: "orderId" });
db.orderItem.belongsTo(db.order,    { foreignKey: "orderId" });

db.automobile.hasMany(db.orderItem,     { foreignKey: "automobileId" });
db.orderItem.belongsTo(db.automobile,   { foreignKey: "automobileId" });

db.order.hasOne(db.delivery,    { foreignKey: "orderId" });
db.delivery.belongsTo(db.order, { foreignKey: "orderId" });

db.priceList.hasMany(db.priceListItem,      { foreignKey: "priceListId" });
db.priceListItem.belongsTo(db.priceList,    { foreignKey: "priceListId" });

db.automobile.hasMany(db.priceListItem,     { foreignKey: "automobileId" });
db.priceListItem.belongsTo(db.automobile,   { foreignKey: "automobileId" });

module.exports = db;