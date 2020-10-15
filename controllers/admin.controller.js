const AuthHistory = require('../models/AuthHistory');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Get login & signup history
exports.getAuthHistory = (req, res) => {
    var query = {};

    // If auth history of a specific date is required
    if (req.body.date)
        query = { date: req.body.date };

    // If auth history of a specific user is required
    if (req.body.user)
        query = {
            ...query,
            "history.userId": mongoose.Types.ObjectId(req.body.user)
        }

    // Get auth history from DB
    AuthHistory.find(query)
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.send(400).send({ error: err });
        })
}

// Get buy/sell transaction history
exports.getTransactionHistory = (req, res) => {
    var query = {};

    // If transaction history of a specific date is required
    if (req.body.date)
        query = { date: req.body.date };

    // If transaction history of a specific buyer is required
    if (req.body.buyer)
        query = { ...query, "sender.id": mongoose.Types.ObjectId(req.body.buyer) }
        
    // If transaction history of a specific seller is required
    if (req.body.seller)
        query = { ...query, "recipient.id": mongoose.Types.ObjectId(req.body.seller) }

    // Get transaction history from DB
    Transaction.find(query)
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(err => {
            res.send(400).send({ error: err });
        })
}