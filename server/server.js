const express = require('express');
const server = express();
const { PORT, DB_URL, corsOptions } = require('./constants');
const routes = require('./router');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { auth } = require('./middlewares/authMiddleware');

mongoose.connect(DB_URL)
  .then(() => console.log(`Successfully connected to DB!`))
  .catch(err => console.log(`DB connection failed!`, err.message));

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors(corsOptions));
server.use(cookieParser());
server.use(auth);
server.use(routes);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
