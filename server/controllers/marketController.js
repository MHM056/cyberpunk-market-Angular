const router = require('express').Router();
const marketService = require('../services/marketService');

router.get('/items', async (req, res) => {
    const items = await marketService.getAll().lean();

    res.status(200).json(items);
});


module.exports = router;