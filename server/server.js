const express = require('express');
const server = express();
const { PORT, DB_URL } = require('./constants');
const routes = require('./router');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect(DB_URL)
  .then(() => console.log(`Successfully connected to DB!`))
  .catch(err => console.log(`DB connection failed!`, err.message));

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors({
  origin: "http://localhost:4200",
  credentials: true,
}));
server.use(cookieParser());
server.use(routes);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
