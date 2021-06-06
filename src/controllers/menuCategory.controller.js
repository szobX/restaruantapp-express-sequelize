const Menu = require('../../models/index.js').MenuCategory;
const MenuPosition = require('../../models/index.js').MenuPosition;
const create = (req, res) => {
    const menuCategory = {
        name: req.body.name,
        menuId: req.params.menuId,
        active: req.body.active ? req.body.active : true,
    };

    Menu.create(menuCategory)
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

const findAll = (req, res) => {
    Menu.findAll({ where: { menuId: req.params.menuId }, include: 'menu' })
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
        const menu = await Menu.findOne({
            where: {
                id: req.params.menuCategoryId,
            },
            include: 'menu',
        });
        console.log(menu);
        if (menu) {
            res.send(menu);
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
    const id = req.params.menuCategoryId;

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
    const id = req.params.menuCategoryId;

    Menu.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Menu Category was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Menu Category ${id} or  Menu was not found!`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Could not delete Menu Category with id=' + id,
            });
        });
};
const findAllMenuItems = (req, res) => {
    MenuPosition.findAll({
        where: { menuCategoryId: req.params.menuCategoryId },
        include: 'menuCategory',
    })
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
module.exports = {
    create,
    findAll,
    find,
    edit,
    remove,
    findAllMenuItems,
};
