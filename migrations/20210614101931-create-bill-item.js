'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('BillItems', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            menuPositionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'MenuPositions',
                    key: 'id',
                },
            },
            billId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Bills',
                    key: 'id',
                },
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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
        await queryInterface.dropTable('OrderPositions');
    },
};
