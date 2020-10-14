const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token)
        return res.status(403).send({ message: "No token provided!" });

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if (!verified)
            return res.status(401).send({ message: "Unauthorized" });
    }
    catch (err) {
        return res.status(400).send({ message: err });
    }
    next();
}

const checkExpiry = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send({ message: "No token provided!" });

    const ONE_DAY = 311040000;
    const currentDate = new Date().getTime();

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    if (currentDate - decodedToken.iat > ONE_DAY)
        return res.status(401).send({ message: "Unauthorized" });
    next();
}

module.exports = { verifyToken, checkExpiry };