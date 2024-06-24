# Real-Time Chat App

Chit-Chat is a real-time chat application where users can create accounts, log in, sign up, and communicate with other users in real-time.

## Features
- User authentication (signup/login)
- Real-time messaging
- User-friendly interface

## Setup

### Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rishabhk02/Snake-Game.git
2. **Navigate to the Frontend Folder:** 
   ```bash
   cd ./Frontend
3. **Install the required packages:**
   ```bash
   npm install
4. **Start Frontend Server**
   ```bash
   npm start

### Backend Setup
1. **Navigate to Backend Folder:**
   ```bash
   cd ./Backend
2. **Install the required packages:**
   ```bash
   npm install
3. **Create .env file and paste**
   ```bash
   MONGO_URL=<your-mongodb-url>
   JWT_SECRETE_KEY=<your-jwt-secret-key>
   PORT=<your-port-number>
   ```
4. **Start Backend Server:**
   ```bash
   npm run dev

The backend should now be running on `http://localhost:5000`.

## Usage
1. Open your browser and go to `http://localhost:3000`.
2. Sign up for a new account or log in if you already have one.
3. Start chatting with other users in real-time!

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time communication: Socket.io

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
