const Router = require('express')
const router = new Router()
const controller = require('../controllers/TravelAgencyController')
const jwt = require('jsonwebtoken');
const { secret } = require('../config');


router.get('/', async (req, res) => {
    try {
            const tours = await controller.getTours(req, res);
             res.render('AdminTourPage.ejs', {tours, title: 'Admin' });
    } catch (error) {
                console.error('Error verifying token:', error);
                res.clearCookie('access_token');
   }
});
router.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});


router.post('/add', async (req, res) => {
    try {
            await controller.createTour(req, res);
    } catch (error) {
        console.error('Error handling create request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.put('/update', async (req, res) => {
    try {
            await controller.updateTour(req, res);
    } catch (error) {
        console.error('Error handling update request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/delete/:tourId', async (req, res) => {
    try {
            await controller.deleteTour(req, res);
    } catch (error) {
        console.error('Error handling delete request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }   
});

module.exports = router 