const { Router } = require('express');
const rootController = require('../controllers/rootController');

const rootRouter = Router();
rootRouter.get('/api/pastes/:pasteID', rootController.get);
rootRouter.post('/api/pastes/', rootController.post);

module.exports = rootRouter;
