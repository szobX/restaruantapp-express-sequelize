'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    BillItem.belongsTo(models.MenuPosition, {
      foreignKey: 'menuPositionId',
      as: 'menuPositions',
  });
    }
  }
  BillItem.init({
    menuPositionId: DataTypes.INTEGER,
    billId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BillItem',
  });
  return BillItem;
};