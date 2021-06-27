const order = require('../../models/index.js').Order;
const orderPosition = require('../../models/index.js').OrderPosition;

// const create = (req, res) => {
//     const orderPositionItem = {
//         name: req.body.name,
//         orderCategoryId: req.params.orderCategoryId,
//         price: req.params.price,
//         currencyId: req.params.currencyId,
//         active: req.body.active ? req.body.active : true,
//     };

//     let isEmpty = false;

//     Object.keys(orderPositionItem).forEach((key) => {
//         if (orderPositionItem[key] == undefined) isEmpty = true;
//     });
//     if (isEmpty) {
//         return res.status(400).send({
//             message: 'Body has Empty value',
//         });
//     }
//     order.create(orderPositionItem)
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message:
//                     err.message ||
//                     'Some error occurred while creating the order.',
//             });
//         });
// };

const findAll = (req, res) => {
    orderPosition.findAll({where:{orderId:req.params.id},include:['menuPositions']})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Order.',
            });
        });
};

const find = async (req, res) => {
    try {
        const order = await orderPosition.findOne({
            where: {
                id: req.params.orderPositionId,
            },
            include: ['menuPositions'],
        });
        console.log(order);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({
                message: 'order  not found',
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving order.',
        });
    }
};
const edit = async (req, res) => {
    const id = req.params.orderPositionId;

    orderPosition.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num == 1) {
                order.findByPk(id).then((e) => res.send(e));
            } else {
                res.send({
                    message: `Cannot update order with${id}. check body or order is not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating order with id=' + id,
            });
        });
};

const remove = async (req, res) => {
    const id = req.params.orderPositionId;

    orderPosition.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'order Position was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete order Position ${id} or  order was not found!`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Could not delete order Position with id=' + id,
            });
        });
};

module.exports = {
    findAll,
    find,
    edit,
    remove,
};
