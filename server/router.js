const router = require('express').Router();
const userController = require('./controllers/userController');
const marketController = require('./controllers/marketController');

router.use('/users', userController);
router.use('/market', marketController);

module.exports = router;