


const order = require('../../models/index.js').Order;
const bill = require('../../models/index.js').Bill;

var Sequelize = require('sequelize');
var Op = Sequelize.Op;

const getBills = (req, res) => {
  const dateFrom = req.body.dateFrom ? new Date(req.body.dateFrom) : 0;
  const dateTo = req.body.dateTo ? new Date(req.body.dateTo) : new Date();
    bill.findAll({
      where:{
        createdAt: {
            [Op.between]: [dateFrom, dateTo]
        }
      },
      include: ['user', 'currency', 'order']
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Bills.',
            });
        });
};

const getOrders = (req, res) => {
  const dateFrom = req.body.dateFrom ? new Date(req.body.dateFrom) : 0;
  const dateTo = req.body.dateTo ? new Date(req.body.dateTo) : new Date();
    order.findAll({
      where:{
        createdAt: {
            [Op.between]: [dateFrom, dateTo]
        }
      },
      include: ['user', 'currency']
    })
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving Orders.',
        });
    });
};


module.exports = {
    getBills,
    getOrders
};
