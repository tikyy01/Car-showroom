module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    clientCode: { type: Sequelize.INTEGER },
    clientId: { type: Sequelize.INTEGER },
    status: { type: Sequelize.STRING }
  }, { timestamps: false });

  return Order;
};