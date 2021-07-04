"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import db from '../db/init.js';
var Bill = require('../../models/index.js').Bill;

var Order = require('../../models/index.js').Order;

var OrderPosition = require('../../models/index.js').OrderPosition;

var BillItem = require('../../models/index.js').BillItem;

var Currency = require('../../models/index').Currency;

var Sequelize = require('sequelize');

var Op = Sequelize.Op; // const createPositions = async (arr,id) =>{
//    const a = await  OrderPosition.create({menuPositionId:id,orderId:id,active:true})
//     return a 
// }
// import RoleEnum from '../db/enums/role.enum.js';

var create = function create(req, res) {
  var bill, isEmpty, order, price, items, newBill;
  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          bill = {
            orderId: req.body.orderId,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          isEmpty = false;
          Object.keys(bill).forEach(function (key) {
            if (bill[key] == undefined) isEmpty = true;
          });

          if (!isEmpty) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            message: 'Body has Empty value'
          }));

        case 6:
          order = null;
          price = 0;
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(Order.findOne({
            where: {
              id: req.body.orderId
            }
          }));

        case 11:
          order = _context.sent;
          price = order.price; // price = menus.reduce((inc,menu)=>( inc+=parseFloat(menu.price)),0)

          _context.next = 15;
          return regeneratorRuntime.awrap(OrderPosition.findAll({
            where: {
              orderId: order.id
            },
            include: ['menuPositions']
          }));

        case 15:
          items = _context.sent;
          console.log(order);
          _context.next = 19;
          return regeneratorRuntime.awrap(Bill.create(_objectSpread({}, bill, {
            price: price,
            clientId: order.clientId,
            currencyId: order.currencyId
          })));

        case 19:
          newBill = _context.sent;
          items.forEach(function (item) {
            BillItem.create({
              menuPositionId: item.id,
              billId: newBill.id,
              active: true
            });
          });
          res.send(newBill);
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](8);
          res.status(500).send({
            message: _context.t0.message || 'Some error occurred while creating the Order.'
          });

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 24]]);
};

var findAll = function findAll(req, res) {
  Bill.findAll().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Order.'
    });
  });
};

var find = function find(req, res) {
  var bill, items;
  return regeneratorRuntime.async(function find$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Bill.findOne({
            where: {
              id: req.params.id
            },
            include: ['user', 'currency']
          }));

        case 3:
          bill = _context2.sent;

          if (!bill) {
            _context2.next = 11;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(BillItem.findAll({
            where: {
              billId: bill.id
            },
            include: ['menuPositions']
          }));

        case 7:
          items = _context2.sent;
          res.send({
            bill: bill,
            items: items
          });
          _context2.next = 12;
          break;

        case 11:
          res.status(404).send({
            message: 'Bill not found'
          });

        case 12:
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send({
            message: _context2.t0.message || 'Some error occurred while retrieving Order.'
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var edit = function edit(req, res) {
  var id;
  return regeneratorRuntime.async(function edit$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          Bill.update(req.body, {
            where: {
              id: id
            }
          }).then(function (num) {
            console.log(num);

            if (num == 1) {
              Bill.findByPk(id).then(function (e) {
                return res.send(e);
              });
            } else {
              res.send({
                message: "Cannot update Bill with".concat(id, ". check body or Bill is not found!")
              });
            }
          })["catch"](function (err) {
            res.status(500).send({
              message: 'Error updating Bill with id=' + id
            });
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var remove = function remove(req, res) {
  var id;
  return regeneratorRuntime.async(function remove$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          Bill.destroy({
            where: {
              id: id
            }
          }).then(function (num) {
            if (num == 1) {
              res.send({
                message: 'Bill was deleted successfully!'
              });
            } else {
              res.send({
                message: "Cannot delete Bill ".concat(id, " or  Bill was not found!")
              });
            }
          })["catch"](function (err) {
            console.log(err);
            res.status(500).send({
              message: 'Could not delete Bill with id=' + id
            });
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  create: create,
  findAll: findAll,
  remove: remove,
  edit: edit,
  find: find
};