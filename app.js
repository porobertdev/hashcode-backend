const express = require('express');
const path = require('node:path');
const { loadEnvConfig } = require('./utils');
const rootRouter = require('./routes/rootRouter');

// env vars
loadEnvConfig();

const PORT = 3000;
const app = express();

// EJS Template Engine Setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// Middleware to save payload data on req.body
app.use(express.urlencoded({ extended: true }));

// Load static files (needed for CSS)
app.use(express.static('./public'));

// Set routers: no need to specify path since it's root /
app.use(rootRouter);

const server = app.listen(PORT, () => console.log('[SERVER] is running...'));
