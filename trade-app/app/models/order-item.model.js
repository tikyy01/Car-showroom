module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("orderItem", {
    orderId: { type: Sequelize.INTEGER },
    automobileId: { type: Sequelize.INTEGER },
    quantity: { type: Sequelize.INTEGER },
    price: { type: Sequelize.FLOAT }
  }, { timestamps: false });

  return OrderItem;
};