module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    clientCode: { type: Sequelize.INTEGER },
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
  }, { timestamps: false });

  return Client;
};