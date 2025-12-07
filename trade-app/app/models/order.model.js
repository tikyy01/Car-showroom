module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    orderNumber: { type: Sequelize.STRING },
    clientCode: {  type: Sequelize.INTEGER},
    priceListNumber: { type: Sequelize.STRING },
    orderDate: { type: Sequelize.DATE },
    totalAmount: { type: Sequelize.DECIMAL },
    status: { type: Sequelize.STRING }
  });

  return Order;
};