const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function () {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.cookies.access_token; 
            if (!token) {
                return res.redirect(302, '/login');
            }

            const isAdmin = jwt.verify(token, secret);

            if (!isAdmin.isAdmin) {
                return res.status(403).json({ message: "you don't have access" });
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({ message: e.message });
        }
    };
};
