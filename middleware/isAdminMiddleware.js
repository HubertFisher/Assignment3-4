const jwt = require('jsonwebtoken')
const {secret} = require('../config')


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "user is not authorized"})
            }
            const isAdmin = jwt.verify(token, secret)
            
            if (!isAdmin) {
                return res.status(403).json({message: "you don't have access"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "user is not authorized"})
        }
    }
};