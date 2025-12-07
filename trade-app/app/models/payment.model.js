module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payment", {
    orderNumber: { type: Sequelize.INTEGER },
    paymentNumber: { type: Sequelize.STRING },
    paymentDate: { type: Sequelize.DATE },
    amount: { type: Sequelize.DECIMAL },
    status: { type: Sequelize.STRING }
  });

  return Payment;
};