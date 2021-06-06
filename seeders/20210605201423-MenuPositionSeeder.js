'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('MenuPositions', [
            {
                name: 'Kamikaze',
                menuCategoryId: 1,
                price: 7,
                currencyId: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Cuba libre',
                menuCategoryId: 1,
                price: 14.5,
                currencyId: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Mojito',
                menuCategoryId: 1,
                price: 9,
                currencyId: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Pomidorowa',
                menuCategoryId: 3,
                price: 2,
                currencyId: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'PanKejki',
                menuCategoryId: 4,
                price: 4,
                currencyId: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('MenuPositions'); /**

        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
