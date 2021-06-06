'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('MenuCategories', [
            {
                name: 'Drinki',
                menuId: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Vege',
                menuId: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Zupy',
                menuId: 2,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Na słodko',
                menuId: 2,
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
        return queryInterface.dropTable('menuCategories'); /**

        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
