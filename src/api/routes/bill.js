const routerExpress = require('express').Router();
const billController = require('../../controllers/bill.controller.js');
const billItemController = require('../../controllers/billItem.controller.js');

module.exports = function (app) {
    const router = routerExpress;
    const route = '/api/bill';

    router.get('/', billController.findAll),
    router.post('/', billController.create),
    router.get('/:id', billController.find),
    router.put('/:id', billController.edit),
    router.delete('/:id', billController.remove);
    router.get('/:id/billItems',billItemController.findAll)
    router.get('/:id/billItems/:billItemId',billItemController.find)
    router.delete('/:id/billItems/:billItemId',billItemController.remove)
    router.put('/:id/billItems/:billItemId',billItemController.edit)
    app.use(route, router);
};