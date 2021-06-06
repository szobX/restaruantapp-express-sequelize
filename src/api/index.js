// import { Router } from 'express';

// import Logger from '../logger.js';

// import MenuRoutes from './routes/menu.js';
// import UserRoutes from './routes/user.js';
// const mainRouter = Router();

// const MenuRoutes = require('./routes/menu.js');
const Logger = require('../logger.js');
const MenuRoutes = require('./routes/menu');
exports.modules = function (app) {
    Logger.info('--> ROUTER INIT <---');

    // app.use('/api/menus', MenuRoutes);
    // const app = mainRout
    app.get('/api/', (req, res) => {
        return res.send({ message: 'server running' });
    });
    MenuRoutes(app);
};
// exports.modules = initRouter;
