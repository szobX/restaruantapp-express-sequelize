'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            tableNumber: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            currencyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Currencies',
                    key: 'id',
                },
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            status:{
                type:Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Orders');
    },
};
