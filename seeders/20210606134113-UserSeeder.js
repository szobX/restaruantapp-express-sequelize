'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                firstName: 'Jerry',
                lastName: 'Buzzer',
                email: 'jbuzzer@test.pl',
                phoneNumber: '443-443-344',
                role: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Jan',
                lastName: 'Nowak',
                email: 'jnowak@test.pl',
                phoneNumber: '443-443-344',
                role: 1,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Dawid',
                lastName: 'Laptop',
                email: 'laptopD@test.pl',
                phoneNumber: '443-123-344',
                role: 2,
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
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
