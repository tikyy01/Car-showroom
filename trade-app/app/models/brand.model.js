module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define("brand", {
    brandCode: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING }
  });

  return Brand;
};