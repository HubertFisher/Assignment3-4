

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
        try {
            const newTour = new Tour(req.body);
            await newTour.save();
            res.status(201).json({ message: 'Tour created successfully', tour: newTour });
        } catch (error) {
            console.error('Error creating tour:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateTour(req, res) {
        try {
            const { id, ...updateData } = req.body;
            const updatedTour = await Tour.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedTour) {
                return res.status(404).json({ message: 'Tour not found' });
            }

            res.json({ message: 'Tour updated successfully', tour: updatedTour });
        } catch (error) {
            console.error('Error updating tour:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteTour(req, res) {
        try {
            const { id } = req.body;
            const deletedTour = await Tour.findByIdAndDelete(id);

            if (!deletedTour) {
                return res.status(404).json({ message: 'Tour not found' });
            }

            res.json({ message: 'Tour deleted successfully', tour: deletedTour });
        } catch (error) {
            console.error('Error deleting tour:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new TourController();
