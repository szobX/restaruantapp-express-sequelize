import Currency from './currency.model.js';
import Order from './order.model.js';
export default (sequelize, Sequelize) => {
    return sequelize.define('OrderPosition', {
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
        price: {
            type: Sequelize.DECIMAL,
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
