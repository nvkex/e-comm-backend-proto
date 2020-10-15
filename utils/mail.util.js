const nodemailer = require('nodemailer');

exports.welcomeMail = (userEmail, name) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: userEmail,
        subject: 'Welcome',
        text: `Hello ${name}!`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Welcome mail sent: ' + info.response);
        }
    });
}

exports.transactionMail = (userEmail, name, product) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: userEmail,
        subject: 'Order Confirmed!',
        text: `Hello ${name}! Transaction for product:${product} successful!`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Transaction mail sent: ' + info.response);
        }
    });
}