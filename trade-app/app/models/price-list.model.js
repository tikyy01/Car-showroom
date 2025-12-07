module.exports = (sequelize, Sequelize) => {
  const PriceList = sequelize.define("priceList", {
    priceListNumber: { type: Sequelize.STRING },
    creationDate: { type: Sequelize.DATE }
  });

  return PriceList;
};