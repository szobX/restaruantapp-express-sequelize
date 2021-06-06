// import db from '../db/init.js';
const User = require('../../models/index.js').User;
// import RoleEnum from '../db/enums/role.enum.js';
const create = (req, res) => {
    console.log(req.body);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        active: true,
    };
    let isEmpty = false;

    Object.keys(user).forEach((key) => {
        if (user[key] == undefined) isEmpty = true;
    });
    if (isEmpty) {
        return res.status(400).send({
            message: 'Body has Empty value',
        });
    }
    User.create(user)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the User.',
            });
        });
};

const findAll = (req, res) => {
    User.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving User.',
            });
        });
};

const find = async (req, res) => {
    try {
        const menu = await User.findAll({
            where: {
                id: req.params.id,
            },
        });
        if (menu.length > 0) {
            res.send(menu[0]);
        } else {
            res.status(404).send({
                message: 'User  not found',
            });
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || 'Some error occurred while retrieving user.',
        });
    }
};
const edit = async (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num == 1) {
                User.findByPk(id).then((e) => res.send(e));
            } else {
                res.send({
                    message: `Cannot update User with${id}. check body or user is not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating User with id=' + id,
            });
        });
};

const remove = async (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'User was deleted successfully!',
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

module.exports = {
    create,
    findAll,
    remove,
    edit,
    find,
};
