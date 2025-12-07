module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("model", {
    modelCode: { type: Sequelize.STRING },
    brandCode: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING }
  });

  return Model;
};