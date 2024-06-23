const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

class AuthController {
    async register(req, res) {
        try {
            const { firstName, lastName, userName, email, password } = req.body;
            if (!firstName) return res.status(400).json({ message: 'First name is required' });
            if (!lastName) return res.status(400).json({ message: 'Last name is required' });
            if (!userName) return res.status(400).json({ message: 'Username is required' });
            if (!email) return res.status(400).json({ message: 'Email is required' });
            if (!password) return res.status(400).json({ message: 'Password is required' });

            let exist = await User.findOne({ $or: [{ email }, { userName }] });
            if (exist) {
                return res.status(400).json({ message: 'Email or Username already registered' });
            }

            const hashPassword = await bcryptjs.hash(password, 12);
            const newUser = await User.create({
                ...req.body,
                ['password']: hashPassword
            });

            return res.status(201).json({ newUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email) return res.status(400).json({ message: 'Email is required' });
            if (!password) return res.status(400).json({ message: 'Password is required' });

            let exist = await User.findOne({ email });
            if (!exist) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            let isValid = bcryptjs.compare(password, exist.password);
            if (!isValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = await jwt.sign({
                ...exist
            }, process.env.JWT_SECRETE_KEY, { expiresIn: 60 * 60 * 24 });

            return res.status(200).json({ userInfo: { userId: exist?._id, email, firstName: exist?.firstName, lastName: exist?.lastName, userName: exist?.userNamme, token } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            return res.status(200).json({ users });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    }
}

module.exports = new AuthController();