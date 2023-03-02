const jwt = require("jsonwebtoken");
const {
    tokenAuthController
} = require("../controllers/auth");

exports.authenticateToken = async (req, res, next) => {
    const token = req.cookies["accessToken"];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { return res.status(403).send(err); }
        req.user = user;
        next();
    });
}
