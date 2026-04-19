module.exports = (sequelize, Sequelize) => {
  const PriceList = sequelize.define("priceList", {
    name: { type: Sequelize.STRING },
    validFrom: { type: Sequelize.DATEONLY }
  }, { timestamps: false });

  return PriceList;
};