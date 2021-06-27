'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        tableNumber: '1',
        number: '334',
        clientId: 1,
        currencyId: 1,
        price: '54,00',
        active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
     
      {
        tableNumber: '13',
        number: '3as4',
        clientId: 1,
        currencyId: 1,
        price: '344,00',
        active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        tableNumber: '12',
        number: '34334',
        clientId: 1,
        currencyId: 1,
        price: '354,00',
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
