'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Currencies', [
            {
                name: 'złotych',
                symbol: 'PLN',
                exchangeRate: 4.2,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'DOLAR',
                symbol: '$',
                exchangeRate: 2,
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
        return queryInterface.dropTable('Currencies'); /**

        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
