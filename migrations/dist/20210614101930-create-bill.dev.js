'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('Bills', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              orderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'Orders',
                  key: 'id'
                }
              },
              currencyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'Currencies',
                  key: 'id'
                }
              },
              clientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'Users',
                  key: 'id'
                }
              },
              price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
              },
              active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.dropTable('Bills'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};