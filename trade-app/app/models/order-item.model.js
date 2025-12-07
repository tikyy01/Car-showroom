module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("orderItem", {
    orderNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',    // имя таблицы orders
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    vin: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'automobiles',   // имя таблицы automobiles
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'orderItems',
    timestamps: true
  });

  return OrderItem;
};