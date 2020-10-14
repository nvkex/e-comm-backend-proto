const router = require('express').Router();

const { 
    loginUser,
    signupUser
} = require('../controllers/auth.controller');

router.post('/login', loginUser);
router.post('/signup', signupUser);

module.exports = router;