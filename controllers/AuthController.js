// Description: This file contains the logic to handle the user registration and login.
const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id, isAdmin) => {
    const payload = {
        id,
        isAdmin
    };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "registration error", errors });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ login: username });
            if (candidate) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashPassword = bcrypt.hashSync(password, 6);
            const user = new User({ login: username, password: hashPassword, role: false});
            await user.save();
            return res.redirect(302, '/login');
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: e.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ login: username });

            if (!user) {
                return res.status(400).json({ message: `User ${username} not found` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message:  "Invalid password"});
            }

            const token = generateAccessToken(user._id, user.role);

           
            res.cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); 

            
            res.redirect(302, '/home'); 
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Login error" });
        }
    }
}

module.exports = new AuthController();
