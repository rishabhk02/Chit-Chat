import React, { useEffect, useState, useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import io from 'socket.io-client';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import ProfileImg from "../assets/ProfileImg.jpg"

const ChatPage = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const socket = io('http://localhost:5000');

    useEffect(() => {
        if (!userInfo) navigate('/');
    }, []);

    socket.on("roomCreated", ({ roomId, messages }) => {
        setRoomId(roomId); setMessages(messages);
    });

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chat-app/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${userInfo?.token}`
                }
            });
            if (response.status === 200) {
                let data = response?.data?.users?.filter((item) => item?._id?.toString() != userInfo?.userId?.toString());
                setUsers(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        if (searchTerm?.trim() === '') return users;
        return users?.filter(item => item?.firstName.toString().toLowerCase().includes(searchTerm?.trim().toLowerCase()));
    }, [users, searchTerm]);


    const handleClick = (user) => {
        try {
            setSelectedUser(user);
            socket.emit('joinRoom', { sender: userInfo?.userId, receiver: user?._id });
        } catch (error) {
            console.error(error);
        }
    }

    const handleSendMessage = (e) => {
        try {
            e.preventDefault();
            socket.emit('messageSent', { roomId, sender: userInfo?.userId, receiver: selectedUser?._id, text: newMessage });
            setNewMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    socket.on('messageReceived', ({ sender, receiver, text }) => {
        let newArr = [...[messages], { sender, receiver, text }];
        console.log(newArr);
        setMessages(prevMessages => [...prevMessages, { sender, receiver, text }]);
    })

    return (
        <div className="chat-page">
            <div className="sidebar">
                <div className="search-container">
                    <SearchIcon className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <ul className="user-list">
                    {filteredUsers.map(user => (
                        <li
                            key={user._id}
                            onClick={() => handleClick(user)}
                            className={selectedUser === user ? 'active' : ''}
                        >
                            <Avatar className="user-avatar"><img src={ProfileImg} alt="" /></Avatar>
                            <span>{`${user?.firstName} ${user?.lastName}`}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-interface">
                {selectedUser ? (
                    <>
                        <div className="chat-header">
                            <Avatar className="user-avatar"><img src={ProfileImg} alt="" /></Avatar>
                            <h2>{`${selectedUser?.firstName} ${selectedUser?.lastName}`}</h2>
                            <div className='call-btn-container'>
                                <button><FaVideo /></button>
                                <button><FaPhoneAlt /></button>
                            </div>
                        </div>
                        <div className="message-list">
                            {messages?.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender?.toString() === userInfo?.userId?.toString() ? 'sent' : 'received'}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="message-form">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="message-input"
                            />
                            <button type="button" className="emoji-button">
                                <EmojiEmotionsIcon />
                            </button>
                            <button type="submit" className="send-button">
                                <SendIcon />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <p>Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;






