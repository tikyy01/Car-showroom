module.exports = (sequelize, Sequelize) => {
  const PriceListItem = sequelize.define("priceListItem", {
    vin: { type: Sequelize.STRING },
    priceListNumber: { type: Sequelize.STRING },
    price: { type: Sequelize.DECIMAL },
    discountPrice: { type: Sequelize.DECIMAL }
  });

  return PriceListItem;
};