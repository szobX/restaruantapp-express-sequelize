'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        tableNumber: '1',
        number: '334',
        clientId: 1,
        currencyId: 1,
        price: '30.50',
        active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
     
      {
        tableNumber: '13',
        number: '3as4',
        clientId: 1,
        currencyId: 1,
        price: '9.00',
        active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        tableNumber: '12',
        number: '34334',
        clientId: 1,
        currencyId: 2,
        price: '35.00',
        active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
