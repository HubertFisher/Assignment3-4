const Router = require('express')
const router = new Router()
const auth = require('./AuthRouter')
const tour = require('./toursRouter')
const isAdminMiddleware  = require('../middleware/isAdminMiddleware')
const AdminRouter	= require('./AdminRouter')


router.get('/', (req, res) => {
	res.render('registration.ejs', { title: 'Registration' })
})
router.use('/', auth)
router.use('/travelAgency', tour)

router.get('/travelAgency', (req, res) => {
	res.render('travelAgency.ejs', { title: 'travel Agency' })
})
router.get('/login', (req, res) => {
	res.render('login.ejs', { title: 'Login' })
})
router.get('/home', (req, res) => {
	res.render('index.ejs', { title: 'home Page' })
})

router.use('/admin',isAdminMiddleware(), AdminRouter);

module.exports = router