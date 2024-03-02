const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.cookies.access_token; 
        if (!token) {
            console.log('user is not authorized')
            return res.status(403).json({message: "user is not authorized"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: " user is not authorized"})
    }
};