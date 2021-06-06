const Menu = require('../../models/index.js').MenuCategory;
const MenuPosition = require('../../models/index.js').MenuPosition;

const create = (req, res) => {
    const menuPositionItem = {
        name: req.body.name,
        menuCategoryId: req.params.menuCategoryId,
        price: req.params.price,
        currencyId: req.params.currencyId,
        active: req.body.active ? req.body.active : true,
    };

    let isEmpty = false;

    Object.keys(menuPositionItem).forEach((key) => {
        if (menuPositionItem[key] == undefined) isEmpty = true;
    });
    if (isEmpty) {
        return res.status(400).send({
            message: 'Body has Empty value',
        });
    }
    Menu.create(menuPositionItem)
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

const find = async (req, res) => {
    try {
        const menu = await MenuPosition.findOne({
            where: {
                id: req.params.menuPositionId,
            },
            include: ['menuCategory', 'currency'],
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
    const id = req.params.menuPositionId;

    MenuPosition.update(req.body, {
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
    const id = req.params.menuPositionId;

    MenuPosition.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Menu Position was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Menu Position ${id} or  Menu was not found!`,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: 'Could not delete Menu Position with id=' + id,
            });
        });
};

module.exports = {
    create,
    find,
    edit,
    remove,
};
