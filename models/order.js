'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'clientId',
        as: 'user',
    });
 
  Order.belongsTo(models.Currency, {
    foreignKey: 'currencyId',
    as: 'currency',
});
    }
  }
  Order.init({
    tableNumber: DataTypes.INTEGER,
    number: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    currencyId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN,
    status:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};