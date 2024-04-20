const router = require('express').Router();

const { auth } = require('./../middlewares/auth');
const { createPrediction, allPredictions } = require('./../controllers/predControl');
const upload = require('../middlewares/upload.middleware');

router.post('/predict', auth, upload.single('file'), createPrediction);

router.get('/results', auth, allPredictions);

module.exports = router;