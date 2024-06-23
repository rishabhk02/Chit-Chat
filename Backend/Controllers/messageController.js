const { PrivateRoom, Message } = require('../Models/messageModel');

function MessageController(app) {
    try {
        const socketIo = app.get('socket');
        socketIo.on('connection', (socket) => {

            socket.on('connect', () => {
                console.log('New Client connected');
            });

            socket.on('joinRoom', async (users) => {
                let { sender, receiver } = users;

                let existRoom = await PrivateRoom.findOne({ $or: [{ $and: [{ sender }, { receiver }] }, { $and: [{ sender: receiver }, { receiver: sender }] }] });
                let roomId = `${sender}@${receiver}`;
                if (!existRoom) {
                    let newRoom = await PrivateRoom.create({
                        roomId, sender, receiver
                    });

                    let newMessageBox = await Message.create({
                        roomId,
                        messages: []
                    });
                } else {
                    roomId = existRoom?.roomId;
                }

                let messageBox = await Message.findOne({ roomId });

                socket.join(roomId);
                socket.emit('roomCreated', { roomId, messages: messageBox?.messages });
            });

            socket.on('messageSent', async ({ roomId, sender, receiver, text }) => {
                let messageBox = await Message.findOne({ roomId });
                messageBox.messages.push({
                    sender,
                    receiver,
                    text
                });
                await messageBox.save();
                socketIo.to(roomId).emit('messageReceived', { sender, receiver, text });
            });



            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
}

module.exports = MessageController;