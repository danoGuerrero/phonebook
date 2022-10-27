const express = require('express');
const app = express();

const routes = require('./routes/postsRoutes');

app.use('/', routes);

module.exports = app;
