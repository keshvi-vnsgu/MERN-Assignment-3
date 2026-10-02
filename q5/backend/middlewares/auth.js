const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Token required"
        });
    }

    try {

        const decoded = jwt.verify(token, "mysecretkey");

        req.employeeId = decoded.id;

        next();

    } catch (err) {

        res.status(401).json({
            message: "Invalid token"
        });

    }
};

module.exports = verifyToken;