const router = require('express').Router();

const {
    loginUser,
    signupUser
} = require('../controllers/auth.controller');

const {
    getAuthHistory,
    getTransactionHistory
} = require('../controllers/admin.controller');

const {
    isAdmin
} = require('../middlewares/admin.middleware');


// Routes
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/auth-history', [isAdmin], getAuthHistory)
router.get('/transaction-history', [isAdmin], getTransactionHistory)

module.exports = router;