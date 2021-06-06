'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Menus',
            [
                {
                    name: 'Menu 1',
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Menu 2',
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Menu 3',
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Menu 4',
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
        /**
         * 
         * Add seed commands here.
         *
         * Example:
        
         */
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Menus');
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
