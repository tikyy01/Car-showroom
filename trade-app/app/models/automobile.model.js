module.exports = (sequelize, Sequelize) => {
  const Automobile = sequelize.define("automobile", {
    vin: { type: Sequelize.STRING },
    year: { type: Sequelize.INTEGER },
    color: { type: Sequelize.STRING },
    price: { type: Sequelize.FLOAT },
    modelId: { type: Sequelize.INTEGER }
  }, { timestamps: false });

  return Automobile;
};