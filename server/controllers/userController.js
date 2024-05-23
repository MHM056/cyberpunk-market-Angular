const router = require('express').Router();
const { TOKEN_KEY, cookieOptions } = require('../constants');
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    const { email, password, repeatPassword } = req.body;
    const userData = {
        email,
        password,
        repeatPassword,
    }

    try {
        const user = await userService.register(userData);
        res.status(200).send({
            email: user.email,
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

router.get('/profile', async (req, res, next) => {
    const { _id: userId } = req.user || '';
    try {
        const userData = await userService.getProfile(userId);
        res.status(200).send(userData);
    } catch (error) {
        next();
    }
});

module.exports = router;