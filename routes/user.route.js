const router = require('express').Router();

// Middlewares
const {
    verifyToken
} = require('../middlewares/auth.middleware');

// Controllers
const { 
    buyProduct
} = require('../controllers/user.controller');

// Buy a product
router.post('/buy', [verifyToken], buyProduct);

module.exports = router;