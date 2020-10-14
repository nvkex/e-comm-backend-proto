const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    date: {
        type: String,
        default: new Date().toString().slice(4, 15)
    },
    history:[{
        authType: {
            type: String,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId
        },
        name:{
            type: String
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        date: {
            type: Date
        }
    }]
});

module.exports = mongoose.model('AuthHistory', AuthSchema);