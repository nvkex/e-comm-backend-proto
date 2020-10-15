const router = require('express').Router();

const { 
    buyProduct
} = require('../controllers/user.controller');

router.post('/buy', buyProduct);

module.exports = router;