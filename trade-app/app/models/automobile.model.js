module.exports = (sequelize, Sequelize) => {
  const Automobile = sequelize.define("automobile", {
    modelCode: { type: Sequelize.INTEGER },
    modelName: { type: Sequelize.STRING },
    year: { type: Sequelize.INTEGER },
    bodyType: { type: Sequelize.STRING },
    brandCode: { type: Sequelize.STRING },
    vin: { type: Sequelize.STRING }
  });

  return Automobile;
};