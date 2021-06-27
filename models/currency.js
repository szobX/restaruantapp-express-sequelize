'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Currency extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Currency.hasMany(models.MenuPosition, {
            });
            Currency.hasMany(models.Order, {
              
            });
        }
    }
    Currency.init(
        {
            name: DataTypes.STRING,
            symbol: DataTypes.STRING,
            exchangeRate: DataTypes.DECIMAL(10, 2),
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Currency',
        },
    );
    return Currency;
};
