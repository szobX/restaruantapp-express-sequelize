const routerExpress = require('express').Router();
const CurrencyController = require('../../controllers/currency.controller.js');
module.exports = function (app) {
    const router = routerExpress;
    const route = '/api/currency';

    router.get('/', CurrencyController.findAll),
        router.post('/', CurrencyController.create),
        router.get('/:id', CurrencyController.find),
        router.put('/:id', CurrencyController.edit),
        router.delete('/:id', CurrencyController.remove);
    app.use(route, router);
};
// export default MenuRoutes;
// module.exports = MenuRoutes;
