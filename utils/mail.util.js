const nodemailer = require('nodemailer');

/**
 * Send a welcome mail on successful registration
 * @param {String} userEmail - user's email
 * @param {String} name - user's name
 */
exports.welcomeMail = (userEmail, name) => {

    // Create a transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASSWORD
        }
    });

    // Mail options - Mail sender, reciever, subject & body
    const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: userEmail,
        subject: 'Welcome',
        text: `Hello ${name}!`
    };

    // Send mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Welcome mail sent: ' + info.response);
        }
    });
}

/**
 * Send transaction report/confirmation as a mail
 * @param {String} userEmail - User's email
 * @param {String} name - User's name
 * @param {ObjectID} product - Product ID
 */
exports.transactionMail = (userEmail, name, product) => {

    // Create a transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASSWORD
        }
    });

    // Mail options - Mail sender, reciever, subject & body
    const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: userEmail,
        subject: 'Order Confirmed!',
        text: `Hello ${name}! Transaction for product:${product} successful!`
    };

    // Send mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Transaction mail sent: ' + info.response);
        }
    });

}