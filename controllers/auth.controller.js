const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuthHistory = require('../models/AuthHistory');
const { welcomeMail } = require('../utils/mail.util');

exports.loginUser = async (req, res) => {

    // Look for the user in DB
    const user = await User.findOne({
        email: req.body.email
    });

    // Check if the user exists
    if (!user) {
        return res.status(400).json({ error: 'User doesnt exist' });
    }

    // Encrypt and match password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({ error: 'Invalid Password' });
    }

    // Sign a JWT token with a secret key
    const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
            iat: new Date().getTime()
        },
        process.env.JWT_TOKEN
    );

    // Log this to Authentication History
    AuthHistory.updateOne(
        { date: new Date().toString().slice(4, 15) },
        {
            $addToSet: {
                history: [{
                    authType: "Login",
                    userId: user._id,
                    name: user.name,
                    isAdmin: user.admin,
                    date: new Date(),
                    ip: req.ip
                }]
            }
        },
        { upsert: true }
    ).then(data => {})
    .catch(err => {})

    // Send JWT token in header
    res.header('auth-token', token).send({ token, user });
}

exports.signupUser = async (req, res) => {

    // Look for the same user
    const emailExists = await User.findOne({ email: req.body.email });

    // Check if user already exists
    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User Model with the info provided
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        defaultIP: req.ip
    });

    // Save user to DB
    try {
        const saveUser = await newUser.save();

        // Send a welcome mail
        welcomeMail(req.body.email, req.body.name)

        // Log this to Authentication History
        AuthHistory.updateOne(
            { date: new Date().toString().slice(4, 15) },
            {
                $addToSet: {
                    history: [{
                        authType: "SignUp",
                        userId: saveUser._id,
                        name: saveUser.name,
                        isAdmin: saveUser.admin,
                        date: new Date(),
                        ip: req.ip
                    }]
                }
            },
            { upsert: true }
        ).then(data => {})
        .catch(err => {})
        
        // Send registration confirmation message to client
        res.send({ status: 200, msg: "User Created!" });
    }
    catch (err) {
        res.send({ status: 400, error: err });
    }
}

