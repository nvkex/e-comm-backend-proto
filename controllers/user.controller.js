const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const cc = require('coupon-code');
const { transactionMail } = require('../utils/mail.util');

exports.buyProduct = async (req, res) => {
    const { productId, sender, recipient, coupon } = req.body;
    console.log(sender.id)
    sender.id = mongoose.Types.ObjectId(sender.id);
    recipient.id = mongoose.Types.ObjectId(recipient.id);

    const transaction = new Transaction({
        productId: mongoose.Types.ObjectId(productId) ,
        sender,
        recipient,
        id: mongoose.Types.ObjectId(productId),
        transactionType: "Payment",
        success: true,
        coupon: coupon ? cc.validate(coupon) || null : null
    })
    try{
        const saveTransaction = await transaction.save();

        transactionMail(sender.email, sender.name, productId);
        transactionMail(recipient.email, sender.name, productId);
        res.send(saveTransaction)

    }
    catch(err){
        console.log(err)
    }
    

} 