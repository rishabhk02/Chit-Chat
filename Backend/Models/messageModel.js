const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    roomId: {
        type: String
    }
});

const chatMessageSchema = new mongoose.Schema({
    roomId: String,
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            receiver: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String
            },
            time: {
                type: String,
                default: new Date().toISOString()
            }
        },
    ],
});

const PrivateRoom = mongoose.model('PrivateRoom', roomSchema);
const Message = mongoose.model('Message', chatMessageSchema);

module.exports = { PrivateRoom, Message };