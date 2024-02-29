const Router = require('express')
const router = new Router()
const controller = require('../controllers/TravelAgencyController')
const jwt = require('jsonwebtoken');
const { secret } = require('../config');


router.get('/', async (req, res) => {
    try {
            const token = req.cookies.access_token;
            try {
                const decoded = jwt.verify(token, secret);
                if (decoded.isAdmin) {
                    const tours = await controller.getTours(req, res);
                     res.render('AdminTourPage.ejs', {tours, title: 'Admin' });
                }else{res.redirect(302, '/login');}
            } catch (error) {
                console.error('Error verifying token:', error);
                res.clearCookie('access_token');
            }
    } catch (error) {
        console.error('Error getting tours:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});


router.post('/add', async (req, res) => {
    try {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, secret);
        
        if (decoded.isAdmin) {
            await controller.createTour(req, res);
        } else {
            res.redirect(302, '/login');
        }
    } catch (error) {
        console.error('Error handling create request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.put('/update', async (req, res) => {
    try {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, secret);
        
        if (decoded.isAdmin) {
            await controller.updateTour(req, res);
        } else {
            res.redirect(302, '/login');
        }
    } catch (error) {
        console.error('Error handling update request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/delete/:tourId', async (req, res) => {
    try {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, secret);
        
        if (decoded.isAdmin) {
            await controller.deleteTour(req, res);
        } else {
            res.redirect(302, '/login');
        }
    } catch (error) {
        console.error('Error handling delete request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }   
});

module.exports = router 