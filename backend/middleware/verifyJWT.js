const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1];
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = {"email": decoded.email, "id": decoded.id};
            next();
        }
    )
}

module.exports = verifyJWT