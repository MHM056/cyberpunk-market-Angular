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

router.get('/items/:itemId/details', async (req, res) => {
    const itemId = req.params.itemId;
    try {
        const itemData = await marketService.getOne(itemId);
        res.status(200).send(itemData);
    } catch (error) {
        res.status(200).send(error.message);
    }
});

router.delete('/items/:itemId/delete', isAuth, async (req, res) => {
    const itemId = req.params.itemId;
    try {
        await marketService.delete(itemId);
        res.status(200).send({ status: 'success', message: 'Item successfully deleted!' })
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;