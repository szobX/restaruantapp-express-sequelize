// import { sequelize, Sequelize } from '../init.js';
import User from './user.model.js';
import Currency from './currency.model.js';
export default (sequelize, Sequelize) => {
    console.log(User);
    const Order = sequelize.define('Order', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        tableNumber: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdOn: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        clientId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: sequelize.models.User,
                key: 'id',
            },
        },
        currencyId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: sequelize.models.Currency,
                key: 'id',
            },
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    });
};
