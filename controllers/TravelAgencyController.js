const Tour = require('../models/Tour');

class TourController {
    async getTours() {
        try {
            const tours = await Tour.find();
            return tours;
        } catch (error) {
            console.error('Error getting tours:', error);
            throw new Error('Internal Server Error');
        }
    }
    async getTour(req, res) {
        try {
            const tourId = req.params.id;
            const tour = await Tour.findById(tourId);
    
            if (!tour) {
                return res.status(404).json({ message: 'Tour not found' });
            }
    
            return tour;
        } catch (error) {
            console.error('Error getting tour:', error);
            throw new Error('Error getting tour'); 
        }
    }
    

    async createTour(req, res) {
        const {
            name,
            description,
            image,
            price,
            duration,
            location,
            startDate,
            endDate,
            maxParticipants
        } = req.body;
        try {
            const newTour = new Tour({
                name,
                description,
                image,
                price,
                duration,
                location,
                startDate,
                endDate,
                maxParticipants
            });
            
            await newTour.save();
            console.log('Tour created successfully');
            res.redirect('/admin');
        } catch (error) {
            console.error('Error creating tour:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateTour(req, res) {
        try {
            const updateData = req.body;
            const id = updateData.tourId;
            console.log('Updating tour with ID:', id);

            const tour = await Tour.findByIdAndUpdate(id,  updateData, { new: true });
    
            if (!tour) {
                return res.status(404).json({ message: 'Tour not found' });
            }

            res.json({ message: 'Tour updated successfully', tour });
        } catch (error) {
            console.error('Error updating tour:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    

    async deleteTour(req, res) {
        try {
            const tourId = req.params.tourId; 
            console.log('Deleting tour with ID:', tourId);
    
            const deletedTour = await Tour.findByIdAndDelete(tourId);
    
            if (!deletedTour) {
                return res.status(404).json({ message: 'Tour not found' });
            }
    
            // Redirect the user after deleting the tour
            res.redirect('/admin');
        } catch (error) {
            console.error('Error deleting tour:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}    

module.exports = new TourController();
