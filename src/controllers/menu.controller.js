const Menu = require('../../models/index.js').Menu;

const create = (req, res) => {
    const MenuItem = {
        name: req.body.name,
        description: req.body.description,
        active: req.body.active ? req.body.active : true,
    };

    let isEmpty = false;
    Object.keys(MenuItem).forEach((key) => {
        if (MenuItem[key] == undefined) isEmpty = true;
    });
    if (isEmpty) {
        return res.status(400).send({
            message: 'Body has Empty value',
        });
    }
    Menu.create(MenuItem)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the menu.',
            });
        });
};

const findAll = function (req, res) {
    // const title = req.query.title
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Menu.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving menu.',
            });
        });
};
const find = async (req, res) => {
    try {
        const menu = await Menu.findAll({
            where: {
                id: req.params.id,
            },
        });
        if (menu.length > 0) {
            res.send(menu[0]);
        } else {
            res.status(404).send({
                message: 'Menu  not found',
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

    Menu.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num == 1) {
                Menu.findByPk(id).then((e) => res.send(e));
            } else {
                res.send({
                    message: `Cannot update Menu with${id}. check body or menu is not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Menu with id=' + id,
            });
        });
};

const remove = async (req, res) => {
    const id = req.params.id;

    Menu.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Menu was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Menu ${id} or  Menu was not found!`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Could not delete Menu with id=' + id,
            });
        });
};

const findActives = async (req, res) => {
    try {
        const menu = await Menu.findAll({
            where: {
                active: true,
            },
        });
        if (menu.length > 0) {
            res.send(menu);
        } else {
            res.status(404).send({
                message: 'active Menu  not found',
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving menu.',
        });
    }
};

module.exports = {
    create,
    find,
    findAll,
    remove,
    edit,
    findActives,
};
