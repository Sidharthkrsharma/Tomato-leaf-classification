const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    predictionOfAllModels: [
        {
            _id: false,
            nameOfTheModel: {
                type: String
            },
            predictedResult: {
                type: String
            },
            confidence: {
                type: String
            },
            message: {
                type: String
            }
        }
    ],
    finalPredictedResultOfTheLeaf: {
        type: Object
    },
    predImageURL: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Prediction', predictionSchema);