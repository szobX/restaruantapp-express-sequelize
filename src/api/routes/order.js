const routerExpress = require('express').Router();
const orderController = require('../../controllers/order.controller.js');
const orderPositionController = require('../../controllers/orderPosition.controller.js');
module.exports = function (app) {
    const router = routerExpress;
    const route = '/api/order';

    router.get('/', orderController.findAll),
        router.post('/', orderController.create),
        router.get('/:id', orderController.find),
        router.put('/:id', orderController.edit),
        router.delete('/:id', orderController.remove);
        router.get('/:id/orderPositions',orderPositionController.findAll)
        router.get('/:id/orderPositions/:orderPositionId',orderPositionController.find)
        router.delete('/:id/orderPositions/:orderPositionId',orderPositionController.remove)
        router.put('/:id/orderPositions/:orderPositionId',orderPositionController.edit)
        router.post('/:id/recount',orderController.recount)
    app.use(route, router);
};
// export default MenuRoutes;
// module.exports = MenuRoutes;
