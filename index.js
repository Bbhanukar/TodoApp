const express = require("express");
const http = require('http');
const routes = require('./routers/router');
const config = require('./configs/config');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let server = http.createServer(app);
server.listen(config.port);

routes.setRouter(app);