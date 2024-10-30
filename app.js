const express = require('express');
const path = require('node:path');
const cron = require('node-cron');
const { loadEnvConfig } = require('./utils');
const rootRouter = require('./routes/rootRouter');
const initializeDB = require('./database/initialize');
const { deleteExpiredPastes } = require('./database/queries');

// env vars
loadEnvConfig();
initializeDB();

const PORT = 3000;
const app = express();

// Middleware to save payload data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set routers: no need to specify path since it's root /
app.use(rootRouter);

const server = app.listen(PORT, () => console.log('[SERVER] is running...'));

cron.schedule('00 00 * * *', async () => {
    console.log('[CRONJOB] - Deleting expired pastes...');
    await deleteExpiredPastes();
});