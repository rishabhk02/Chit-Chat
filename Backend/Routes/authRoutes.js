const express = require('express');
const router = express.Router();
const authMiddlewares = require('../Middlewares/authMiddlewares');
const AuthController = require('../Controllers/authController');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/getAllUsers', authMiddlewares, AuthController.getAllUsers);

module.exports = router;