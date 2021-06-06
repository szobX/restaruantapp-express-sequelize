const routerExpress = require('express').Router();
// import express from 'express';

// const menuController = require('../../models/menu/controller.js');
const Menu = require('../../controllers/menu.controller.js');
const MenuCategory = require('../../controllers/menuCategory.controller.js');
const MenuPosition = require('../../controllers/menuPosition.controller.js');
// import * as Menu from '../../controllers/menu.controller.js';
// const MenuCategory = require('../../controllers/menuCategory.controller.js');
// import * as menuCategory from '../../controllers/menuCategory.controller.js';
module.exports = function (app) {
    const router = routerExpress;
    const route = '/api/menu';
    // route /active must be before dynamic /:id
    router.get('/', Menu.findAll);
    router.post('/', Menu.create);
    router.get('/active', Menu.findActives);
    router.get('/:id', Menu.find);
    router.put('/:id', Menu.edit);
    router.delete('/:id', Menu.remove);
    // MENU CATEGORY
    router.get('/:menuId/menuCategory', MenuCategory.findAll);
    router.post('/:menuId/menuCategory', MenuCategory.create);
    router.get('/:menuId/menuCategory/:menuCategoryId', MenuCategory.find);
    router.delete('/:menuId/menuCategory/:menuCategoryId', MenuCategory.remove);
    router.put('/:menuId/menuCategory/:menuCategoryId', MenuCategory.edit);
    router.get(
        '/:menuId/menuCategory/:menuCategoryId/menuPositions',
        MenuCategory.findAllMenuItems,
    );
    // MENU POSITIONS
    router.post(
        '/:menuId/menuCategory/:menuCategoryId/menuPositions',
        MenuPosition.create,
    );
    router.get(
        '/:menuId/menuCategory/:menuCategoryId/menuPositions/:menuPositionId',
        MenuPosition.find,
    );
    router.put(
        '/:menuId/menuCategory/:menuCategoryId/menuPositions/:menuPositionId',
        MenuPosition.edit,
    );
    router.delete(
        '/:menuId/menuCategory/:menuCategoryId/menuPositions/:menuPositionId',
        MenuPosition.remove,
    );

    app.use(route, router);
};
// export default MenuRoutes;
// module.exports = MenuRoutes;
