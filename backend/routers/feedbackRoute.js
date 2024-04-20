const router = require('express').Router();

const { auth } = require('./../middlewares/auth');
const { createFeedbackOfUser, getFeedbackOfUser } = require('./../controllers/feedbackControl');


router.post('/feedback', auth, createFeedbackOfUser);
router.get('/feedback', auth, getFeedbackOfUser);

module.exports = router;