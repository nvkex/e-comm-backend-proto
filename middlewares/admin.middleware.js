const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

// Verify Token and Check if the user is Admin
const isAdmin = (req, res, next) => {
    const token = req.headers["x-access-token"];

    // Check if token exists
    if (!token)
        return res.status(403).send({ message: "No token provided!" });

    try {
        // Verify using JWT
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        
        // Check if user is admin
        User.findOne({_id: mongoose.Types.ObjectId(verified.id)})
        .then(data => {
            if(!data.admin)
                return res.status(401).send({ message: "Unauthorized" });
        })
        .catch(err => {console.log(err)})

        if (!verified)
            return res.status(401).send({ message: "Unauthorized" });
    }
    catch (err) {
        return res.status(400).send({ message: err });
    }
    next();
}

module.exports = { isAdmin };