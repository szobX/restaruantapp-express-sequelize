
const routerExpress = require('express').Router();
const reportController = require('../../controllers/report.controller.js');
module.exports = function (app) {
    const router = routerExpress;
    const route = '/api/report';

    router.post('/bill', reportController.getBills),
    router.post('/order', reportController.getOrders),

    app.use(route, router);
};
// export default MenuRoutes;
// module.exports = MenuRoutes;
