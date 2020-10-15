const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const cc = require('coupon-code');
const { transactionMail } = require('../utils/mail.util');

exports.buyProduct = async (req, res) => {

    // Get data from body
    const { productId, sender, recipient, coupon } = req.body;

    // Convert all IDs from String type to ObjectID type.
    sender.id = mongoose.Types.ObjectId(sender.id);
    recipient.id = mongoose.Types.ObjectId(recipient.id);

    // Create a new transaction
    const transaction = new Transaction({
        productId: mongoose.Types.ObjectId(productId) ,
        sender,
        recipient,
        id: mongoose.Types.ObjectId(productId),
        transactionType: "Payment",
        success: true,
        // Store only verified coupon code
        coupon: coupon ? cc.validate(coupon) || null : null
    })
    try{

        // Save transaction
        const saveTransaction = await transaction.save();

        // Send confirmation mail to both individuals
        transactionMail(sender.email, sender.name, productId);
        transactionMail(recipient.email, sender.name, productId);

        // Send transaction reciept to client
        res.send(saveTransaction)

    }
    catch(err){
        console.log(err)
    }
    

} 