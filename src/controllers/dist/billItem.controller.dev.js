"use strict";

var order = require('../../models/index.js').Order;

var billItem = require('../../models/index.js').BillItem;

var findAll = function findAll(req, res) {
  billItem.findAll({
    where: {
      billId: req.params.id
    },
    include: ['menuPositions']
  }).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Order.'
    });
  });
};

var find = function find(req, res) {
  var _bill;

  return regeneratorRuntime.async(function find$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(billItem.findOne({
            where: {
              id: req.params.billItemId
            },
            include: ['menuPositions']
          }));

        case 3:
          _bill = _context.sent;
          console.log(_bill);

          if (_bill) {
            res.send(_bill);
          } else {
            res.status(404).send({
              message: 'bill  not found'
            });
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            message: _context.t0.message || 'Some error occurred while retrieving bill.'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var edit = function edit(req, res) {
  var id;
  return regeneratorRuntime.async(function edit$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.billItemId;
          billItem.update(req.body, {
            where: {
              id: id
            }
          }).then(function (num) {
            console.log(num);

            if (num == 1) {
              bill.findByPk(id).then(function (e) {
                return res.send(e);
              });
            } else {
              res.send({
                message: "Cannot update bill with".concat(id, ". check body or bill is not found!")
              });
            }
          })["catch"](function (err) {
            res.status(500).send({
              message: 'Error updating bill with id=' + id
            });
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var remove = function remove(req, res) {
  var id;
  return regeneratorRuntime.async(function remove$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.billItemId;
          billItem.destroy({
            where: {
              id: id
            }
          }).then(function (num) {
            if (num == 1) {
              res.send({
                message: 'bill Position was deleted successfully!'
              });
            } else {
              res.send({
                message: "Cannot delete bill Position ".concat(id, " or  bill was not found!")
              });
            }
          })["catch"](function (err) {
            console.log(err);
            res.status(500).send({
              message: 'Could not delete bill Position with id=' + id
            });
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  findAll: findAll,
  find: find,
  edit: edit,
  remove: remove
};