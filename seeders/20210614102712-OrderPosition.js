'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('OrderPositions', [
      {
        menuPositionId:1,
        orderId: 1,
        active: true,

      },
      {
        menuPositionId:2,
        orderId: 1,
        active: true,

      },
      {
        menuPositionId:1,
        orderId: 1,
        active: true,

      },
      {
        menuPositionId:3,
        orderId: 2,
        active: true,

      },

     ])
   

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
