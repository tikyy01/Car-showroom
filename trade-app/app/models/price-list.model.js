module.exports = (sequelize, Sequelize) => {
  const PriceList = sequelize.define("priceList", {
    priceListNumber: { type: Sequelize.INTEGER, },
    creationDate: { type: Sequelize.DATE }
  });

  return PriceList;
};