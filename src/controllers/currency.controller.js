const Currency = require('../../models/index.js').Currency;
const create = (req, res) => {
    const currencyItem = {
        name: req.body.name,
        symbol: req.body.symbol,
        exchangeRate: req.body.exchangeRate,
        active: req.body.active ? req.body.active : false,
    };
    let isEmpty = false;

    Object.keys(currencyItem).forEach((key) => {
        if (currencyItem[key] == undefined) isEmpty = true;
    });
    if (isEmpty) {
        return res.status(400).send({
            message: 'Body has Empty value',
        });
    }
    Currency.create(currencyItem)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Currency.',
            });
        });
};

const findAll = function (req, res) {
    Currency.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Currency.',
            });
        });
};
const find = async (req, res) => {
    try {
        const menu = await Currency.findAll({
            where: {
                id: req.params.id,
            },
        });
        if (menu.length > 0) {
            res.send(menu[0]);
        } else {
            res.status(404).send({
                message: 'Currency  not found',
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving menu.',
        });
    }
};
const edit = async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    Currency.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num == 1) {
                Currency.findByPk(id).then((e) => res.send(e));
            } else {
                res.send({
                    message: `Cannot update Currency with${id}. check body or currency is not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Currency with id=' + id,
            });
        });
};

const remove = async (req, res) => {
    const id = req.params.id;

    Currency.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Currency was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Menu ${id} or  Currency was not found!`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Could not delete Currency with id=' + id,
            });
        });
};

module.exports = {
    create,
    find,
    findAll,
    remove,
    edit,
};
