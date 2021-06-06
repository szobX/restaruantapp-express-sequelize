import helmet from 'helmet';
import express from 'express';
// const db = require('./db/models');
// import configDataBase from './db/config.js';
// import dbInit from './db/init.js';
import bodyParser from 'body-parser';
// const models = require('./models');

import Logger from './logger.js';
// import initRouter from './api/index.js';
// const Logger = require('./logger');
export default class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.app.use(helmet());
        this.app.use(bodyParser.json());
    }

    start(port, name, keyPath, certPath) {
        this.app
            .listen(this.port, () => {
                Logger.info(`
              ################################################
              🛡️  Server listening on port: ${this.port} 🛡️
              ################################################
            `);
            })
            .on('error', (err) => {
                Logger.error(err);
                process.exit(1);
            });
    }
}

// module.exports = Server;
