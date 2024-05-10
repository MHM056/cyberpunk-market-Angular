const CONFIG = {
    PORT: 3000,
    DB_URL: 'mongodb://localhost:27017/cyberpunk',
    SECRET: 'd4fe78d2-6450-11ee-8c99-0242ac120002',
    TOKEN_KEY: 'token',
    corsOptions: { origin: "http://localhost:4200", credentials: true },
    cookieOptions: { httpOnly: true, sameSite: 'none', secure: true }
}

module.exports = CONFIG;
