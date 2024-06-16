const router = require('express').Router();
const { TOKEN_KEY, cookieOptions } = require('../constants');
const userService = require('../services/userService');
const { isAuth } = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    const { email, username, password, repeatPassword } = req.body;
    const userData = {
        email,
        username,
        password,
        repeatPassword,
        imageUrl: '',
    }

    try {
        const user = await userService.register(userData);
        res.status(200).send({
            email: user.email,
            username: user.username,
            _id: user._id
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await userService.login(email, password);
        const { user, token } = userData;

        res.cookie(TOKEN_KEY, token, cookieOptions);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie(TOKEN_KEY);
    res.status(204).send({ message: 'Logout successful!' });
});

router.get('/profile', isAuth, async (req, res, next) => {
    const { _id: userId } = req.user || '';
    try {
        const userData = await userService.getProfile(userId);
        res.status(200).send(userData);
    } catch (error) {
        next();
    }
});

router.put('/profile', isAuth, async (req, res, next) => {
    const { _id: userId } = req.user || '';
    const { imageUrl, username } = req.body;
    try {
        await userService.updateProfile(userId, { imageUrl, username });
        res.status(200).send({ status: "success", message: "Successfully edited profile!" })
    } catch (error) {
        res.status(400).send({ status: "failed", message: 'Unable to update!' })
    }
});
module.exports = router;