// const route = require('express').Router();
import express from 'express';
import UserController from '../../controllers/user.controller.js';
const UserRoutes = (app) => {
    const router = express.Router();
    const route = '/api/users';

    router.get('/', UserController.findAll);
    router.get('/:id', (request, response) => {
        console.log(request, response);
        return response.send({ ...request.params });
    });
    router.post('/', UserController.create);

    app.use(route, router);
};
export default UserRoutes;
// module.exports = MenuRoutes;
