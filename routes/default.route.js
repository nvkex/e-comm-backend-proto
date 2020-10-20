const router = require('express').Router();

// Controllers
const { 
    errorController
} = require('../controllers/default.controller');

router.get('/', errorController);

module.exports = router;