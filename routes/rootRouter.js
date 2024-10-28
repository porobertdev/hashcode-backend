const { Router } = require('express');
const rootController = require('../controllers/rootController');

const rootRouter = Router();
rootRouter.use('/', rootController.get);

module.exports = rootRouter;
