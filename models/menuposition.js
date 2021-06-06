'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MenuPosition extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MenuPosition.belongsTo(models.MenuCategory, {
                foreignKey: 'menuCategoryId',
                as: 'menuCategory',
            });
            MenuPosition.belongsTo(models.Currency, {
                foreignKey: 'currencyId',
                as: 'currency',
            });
        }
    }
    MenuPosition.init(
        {
            menuCategoryId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.DECIMAL(10, 2),
            currencyId: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'MenuPosition',
        },
    );
    return MenuPosition;
};
