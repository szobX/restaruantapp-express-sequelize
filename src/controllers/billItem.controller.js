const order = require('../../models/index.js').Order;
const billItem = require('../../models/index.js').BillItem;

const findAll = (req, res) => {
    billItem.findAll({where:{billId:req.params.id},include:['menuPositions']})
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
        const bill = await billItem.findOne({
            where: {
                id: req.params.billItemId,
            },
            include: ['menuPositions'],
        });
        console.log(bill);
        if (bill) {
            res.send(bill);
        } else {
            res.status(404).send({
                message: 'bill  not found',
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving bill.',
        });
    }
};
const edit = async (req, res) => {
    const id = req.params.billItemId;

    billItem.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num == 1) {
                bill.findByPk(id).then((e) => res.send(e));
            } else {
                res.send({
                    message: `Cannot update bill with${id}. check body or bill is not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating bill with id=' + id,
            });
        });
};

const remove = async (req, res) => {
    const id = req.params.billItemId;

    billItem.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'bill Position was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete bill Position ${id} or  bill was not found!`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Could not delete bill Position with id=' + id,
            });
        });
};

module.exports = {
    findAll,
    find,
    edit,
    remove,
};
