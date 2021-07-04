'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
      });
      Bill.belongsTo(models.Currency, {
        foreignKey: 'orderId',
        as: 'currency',
      });
      Bill.belongsTo(models.User, {
        foreignKey: 'clientId',
        as: 'user',
      });
    }
  }
  Bill.init({
    orderId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    currencyId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};