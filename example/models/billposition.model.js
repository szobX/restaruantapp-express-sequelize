// import { sequelize, Sequelize  from '../init.js';
import Bill from './bill.model.js';
import Currency from './currency.model.js';
export default (sequelize, Sequelize) => {
    return sequelize.define('BillPosition', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdOn: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        currencyId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: sequelize.models.Currency,
                key: 'id',
            },
        },
        billId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: sequelize.models.Bill,
                key: 'id',
            },
        },
    });
};
