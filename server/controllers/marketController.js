const router = require('express').Router();
const marketService = require('../services/marketService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/items', async (req, res) => {
    const items = await marketService.getAll().lean();

    res.status(200).json(items);
});

router.post('/items', isAuth, async (req, res) => {
    const itemData = req.body;
    try {
        await marketService.create(itemData);
        res.status(200).send('Successfully posted a new item!');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;