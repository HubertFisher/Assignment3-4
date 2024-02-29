const Router = require('express')
const router = new Router()

router.get('/', (req, res) => {
	res.render('index.ejs', { title: 'Main Page' })
})
module.exports = router