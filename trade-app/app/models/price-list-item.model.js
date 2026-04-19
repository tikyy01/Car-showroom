module.exports = (sequelize, Sequelize) => {
  const PriceListItem = sequelize.define("priceListItem", {
    priceListId: { type: Sequelize.INTEGER },
    automobileId: { type: Sequelize.INTEGER },
    clientPrice: { type: Sequelize.FLOAT }
  }, { timestamps: false });

  return PriceListItem;
};