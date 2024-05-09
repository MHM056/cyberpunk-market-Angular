const router = require('express').Router();
const { TOKEN_KEY } = require('../constants');
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    const email = 'johnny@gmail.com',
        password = '123',
        repeatPassword = '123',
        created_at = new Date();

    try {
        const user = await userService.register({ email, password, created_at, repeatPassword });
        res.status(200).json({
            email: user.email,
            _id: user._id
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);

        res.cookie(TOKEN_KEY, token, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 99 * 99 * 60000)
        });
        
        res.status(200).json(token);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_KEY);
    res.status(200).json({ message: 'Logout successful!' });
});

module.exports = router;