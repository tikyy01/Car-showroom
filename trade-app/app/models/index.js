const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.client = require("./client.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize);
db.orderItem = require("./order-item.model.js")(sequelize, Sequelize);
db.automobile = require("./automobile.model.js")(sequelize, Sequelize);
db.brand = require("./brand.model.js")(sequelize, Sequelize);
db.model = require("./model.model.js")(sequelize, Sequelize);
db.delivery = require("./delivery.model.js")(sequelize, Sequelize);
db.priceList = require("./price-list.model.js")(sequelize, Sequelize);
db.priceListItem = require("./price-list-item.model.js")(sequelize, Sequelize);


db.client.hasMany(db.order, { foreignKey: "clientCode" });
db.order.belongsTo(db.client, { foreignKey: "clientCode" });

db.order.hasMany(db.payment, { foreignKey: "orderNumber" });
db.payment.belongsTo(db.order, { foreignKey: "orderNumber" });

db.order.hasMany(db.orderItem, { foreignKey: "orderNumber" });
db.orderItem.belongsTo(db.order, { foreignKey: "orderNumber" });

db.automobile.hasMany(db.orderItem, { foreignKey: "vin" });
db.orderItem.belongsTo(db.automobile, { foreignKey: "vin" });

db.brand.hasMany(db.model, { foreignKey: "brandCode" });
db.model.belongsTo(db.brand, { foreignKey: "brandCode" });

db.model.hasMany(db.automobile, { foreignKey: "modelCode" });
db.automobile.belongsTo(db.model, { foreignKey: "modelCode" });

db.order.hasMany(db.delivery, { foreignKey: "orderNumber" });
db.delivery.belongsTo(db.order, { foreignKey: "orderNumber" });

db.automobile.hasMany(db.delivery, { foreignKey: "vin" });
db.delivery.belongsTo(db.automobile, { foreignKey: "vin" });

db.priceList.hasMany(db.priceListItem, { foreignKey: "priceListNumber" });
db.priceListItem.belongsTo(db.priceList, { foreignKey: "priceListNumber" });

db.automobile.hasMany(db.priceListItem, { foreignKey: "vin" });
db.priceListItem.belongsTo(db.automobile, { foreignKey: "vin" });


module.exports = db;