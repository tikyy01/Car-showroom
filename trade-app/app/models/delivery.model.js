module.exports = (sequelize, Sequelize) => {
  const Delivery = sequelize.define("delivery", {
    deliveryNumber: { type: Sequelize.INTEGER, },
    orderNumber: { type: Sequelize.INTEGER },
    vin: { type: Sequelize.INTEGER },
    deliveryDate: { type: Sequelize.DATE },
    deliveryType: { type: Sequelize.STRING }
  });

  return Delivery;
};
