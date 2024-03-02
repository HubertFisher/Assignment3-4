const Router = require('express')
const router = new Router()
const controller = require('../controllers/TravelAgencyController')
const CartController = require('../controllers/CartController');
const isAuthMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const tours = await controller.getTours(req, res);
        res.render('travelAgency', { tours, title: 'Tours' });
    } catch (error) {
        console.error('Error getting tours:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) =>{
    try {
        const tour = await controller.getTour(req, res);
        res.render('tour', { tour, title: 'Tour' });
    } catch (error) {
        console.error('Error getting tour:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.post('/addToCart', isAuthMiddleware,(req, res) => {
   try{
    CartController.addToCart(req, res); 
   } catch (error) {    
    console.error('Error adding to cart:', error);
    res.status(201).json({ message: 'Internal Server Error' });
   }

});

module.exports = router