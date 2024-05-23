const jwt = require('../lib/jwt');
const { SECRET, TOKEN_KEY } = require('../constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies[TOKEN_KEY];
    console.log(token);
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            next();
        } catch (error) {
            res.clearCookie(TOKEN_KEY);
            res.status(500).send('Oops, something went wrong');
        }
    } else {
        next();
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.status(401).send('Unauthorized!');
    }

    next();
}