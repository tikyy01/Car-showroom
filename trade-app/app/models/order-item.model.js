module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("orderItem", {
    orderNumber: { type: Sequelize.STRING },
    vin: { type: Sequelize.STRING }
  });

  return OrderItem;
};