const { Router } = require('express');
const rootController = require('../controllers/rootController');

const rootRouter = Router();
rootRouter.use('/api/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4321');
    res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type');
    next();
})
rootRouter.get('/api/pastes/:pasteID', rootController.get);
rootRouter.post('/api/pastes/', rootController.post);

module.exports = rootRouter;
