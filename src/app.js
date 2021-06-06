// const express = require("express");
// const Sequelize = require("sequelize");
// const sequalize = new Sequelize('')
// import Server from './server.js'
// const Server = require('./server');
// const server = new Server(3005);

// server.start();
const Routers = require('./api/index.js');
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const Logger = require('./logger.js');
const port = process.env.PORT || 3005;

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(helmet());
app.listen(port, () => {
    Logger.info(`
    
    🛡️  Server listening on port: ${port} 🛡️
  `);
}).on('error', (err) => {
    Logger.error(err);
    process.exit(1);
});

Routers.modules(app);
