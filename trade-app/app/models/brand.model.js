module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define("brand", {
    brandCode: { type: Sequelize.INTEGER, },
    name: { type: Sequelize.STRING }
  });

  return Brand;
};