module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    clientCode: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING }
  });

  return Client;
};