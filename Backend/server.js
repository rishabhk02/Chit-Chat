require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const mainRouter = require('./mainRouter');
const socketIo = require('socket.io');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mainRouter);

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully!')
    } catch (error) {
        console.error(error);
    }
}

connectDb();

const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.set('socket', io);

require('./Controllers/messageController')(app);