const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    DOB: {
        type: Date,
        required: false
    },
    lastLogin: {
        type: Date,
        required: false
    },
    defaultIP: {
        type: String
    },
    transactionHistory: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true
        },
        transactionType: {
            type: String
        },
        recipient: {
            type: String
        },
        date: {
            type: Date
        },
        success: {
            type: Boolean,
            default: false
        }
    }]
});

module.exports = mongoose.model('User', UserSchema);