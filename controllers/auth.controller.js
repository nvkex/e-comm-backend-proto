const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuthHistory = require('../models/AuthHistory');

exports.loginUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).json({ error: 'User doesnt exist' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({ error: 'Invalid Password' });
    }

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
                    date: new Date()
                }]
            }
        },
        { upsert: true }
    ).then(data => {})
    .catch(err => {})

    res.header('auth-token', token).send({ token, user });
}

exports.signupUser = async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const saveUser = await newUser.save();
        console.log(saveUser)

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
                        date: new Date()
                    }]
                }
            },
            { upsert: true }
        ).then(data => {})
        .catch(err => {})

        res.send({ status: 200, msg: "User Created!" });
    }
    catch (err) {
        res.send({ status: 400, error: err });
    }
}

