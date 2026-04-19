module.exports = (sequelize, Sequelize) => {
  const Delivery = sequelize.define("delivery", {
    city: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    orderId: { type: Sequelize.INTEGER }
  }, { timestamps: false });

  return Delivery;
};