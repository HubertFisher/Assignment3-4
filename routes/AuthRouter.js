const Router = require('express')
const router = new Router()
const controller = require('../controllers/AuthController')
const {check} = require("express-validator")

router.post('/registration', [
    check('username', "username cannot be empty").notEmpty(),
    check('password', "password should contain 4 to 10 symbols").isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)

module.exports = router