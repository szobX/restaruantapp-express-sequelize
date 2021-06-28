'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderPosition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   OrderPosition.hasMany(models.Order, {
    //     as: 'order',
    // });
    OrderPosition.belongsTo(models.MenuPosition, {
      foreignKey: 'menuPositionId',
      as: 'menuPositions',
  });
    }
  }
  OrderPosition.init({
    menuPositionId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderPosition',
  });
  return OrderPosition;
};