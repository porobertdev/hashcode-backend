const express = require('express');
const path = require('node:path');
const { loadEnvConfig } = require('./utils');
const rootRouter = require('./routes/rootRouter');

// env vars
loadEnvConfig();

const PORT = 3000;
const app = express();

// Middleware to save payload data on req.body
app.use(express.urlencoded({ extended: true }));

// Set routers: no need to specify path since it's root /
app.use(rootRouter);

const server = app.listen(PORT, () => console.log('[SERVER] is running...'));
