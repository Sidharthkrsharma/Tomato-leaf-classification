const router = require('express').Router();

const User = require('../controllers/userControl');
const upload = require('../middlewares/upload.middleware');
const { auth } = require('./../middlewares/auth');

router.post('/auth', User.auth);

router.get('/profile', auth, User.getUserProfile);

router.put('/profileUpdate', auth, upload.single('profilePhoto'), User.updateUserProfile);

module.exports = router;