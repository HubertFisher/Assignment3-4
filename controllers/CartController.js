const TourCart = require('../models/TourCart');
const Tour = require('../models/Tour');

class CartController {  

    async getCart(req, res) {
        try {
            const cart = await TourCart.findOne({ user: req.user.id }).populate('tours.tour');
            return cart;
        } catch (error) {
            console.error('Error getting cart:', error);
            throw new Error('Internal Server Error');
        }
    }

    async addToCart(req, res) {
        const { tourId, quantity } = req.body;
        try {
            const tour = await Tour.findById(tourId);
            if (!tour) {
                return res.status(404).json({ message: 'Tour not found' });
            }
            let cart = await TourCart.findOne({ user: req.user.id });
            if (!cart) {
                cart = new TourCart({ user: req.user.id, tours: [{ tour: tourId, quantity }] });
                await cart.save();
                return res.status(201).json({ message: 'Tour added to cart' });
            }
            const tourIndex = cart.tours.findIndex(t => t.tour == tourId);
            if (tourIndex !== -1) {
                cart.tours[tourIndex].quantity += quantity;
            } else {
                cart.tours.push({ tour: tourId, quantity });
            }
            await cart.save();
            return res.status(201).json({ message: 'Tour added to cart' });
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw new Error('Internal Server Error');
        }
    }

    async removeFromCart(req, res) {
        const { tourId } = req.body;
        try {
            let cart = await TourCart.findOne({ user: req.user.id });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            const tourIndex = cart.tours.findIndex(t => t.tour == tourId);
            if (tourIndex === -1) {
                return res.status(404).json({ message: 'Tour not found in cart' });
            }
            cart.tours.splice(tourIndex, 1);
            await cart.save();
            return res.status(200).json({ message: 'Tour removed from cart' });
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw new Error('Internal Server Error');
        }
    }
}
module.exports = new CartController();