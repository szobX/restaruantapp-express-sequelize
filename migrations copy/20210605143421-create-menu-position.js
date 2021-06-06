'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('MenuPositions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            menuCategoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'menuCategories',
                    key: 'id',
                },
            },
            name: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
            },
            currencyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Currencies',
                    key: 'id',
                },
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
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
        await queryInterface.dropTable('MenuPositions');
    },
};
