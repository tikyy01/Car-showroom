module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("model", {
    modelCode: { type: Sequelize.INTEGER },
    name: { type: Sequelize.STRING },
    brandId: { type: Sequelize.INTEGER }
  }, { timestamps: false });

  return Model;
};