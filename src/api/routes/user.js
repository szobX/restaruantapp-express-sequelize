const routerExpress = require('express').Router();
const UserController = require('../../controllers/user.controller');
module.exports = function (app) {
    const router = routerExpress;
    const route = '/api/user';
    router.get('/', UserController.findAll);
    router.post('/', UserController.create);
    router.get('/:id', UserController.find);
    router.delete('/:id', UserController.remove);
    router.put('/:id', UserController.edit);

    app.use(route, router);
};
