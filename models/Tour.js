const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
      type : String
    },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
},
    updatedAt: {
    type: Date,
    default: Date.now
},  
    deletedAt: {
    type: Date
}
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;