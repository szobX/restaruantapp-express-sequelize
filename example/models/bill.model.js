import Currency from './currency.model.js';
import Order from './order.model.js';
export default (sequelize, Sequelize) => {
    return sequelize.define('Bill', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdOn: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        tableNumber: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        currencyId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: sequelize.models.Currency,
                key: 'id',
            },
        },
        orderId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: sequelize.models.Order,
                key: 'id',
            },
        },
    });
};
