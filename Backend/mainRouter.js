const express = require('express');
const app = express();
const authRouter = require('./Routes/authRoutes');

app.use('/chat-app', authRouter);

module.exports = app;
