const mongoose = require('mongoose');

// {
//     "feedback": "lkmlfk4lkj",
//     "rating": 3.5
//   }

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: [true, 'Please enter your feedback'],
    },
    rating: {
        type: Number,
        required: [true, 'Please enter your rating'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Feedback', feedbackSchema);