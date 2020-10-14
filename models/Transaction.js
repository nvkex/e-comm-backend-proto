const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true
    },
    transactionType: {
        type: String
    },
    productId:{
        type:  mongoose.Schema.Types.ObjectId
    },
    sender: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String
        },
        location: {
            type: String
        }
    },
    recipient: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: {
            type: String
        },
        location: {
            type: String
        }
    },
    date: {
        type: Date,
        default: new Date()
    },
    success: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);