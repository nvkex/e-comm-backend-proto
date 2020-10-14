const AuthHistory = require('../models/AuthHistory');
const Transaction = require('../models/Transaction');

// Get login & signup history
exports.getAuthHistory = (req, res) => {
    AuthHistory.find({})
    .then(data => {
        res.status(200).send({data});
    })
    .catch(err => {
        res.send(400).send({error: err});
    })
}

// Get buy/sell transaction history
exports.getTransactionHistory = (req, res) => {
    Transaction.find({})
    .then(data => {
        res.status(200).send({data});
    })
    .catch(err => {
        res.send(400).send({error: err});
    })
}