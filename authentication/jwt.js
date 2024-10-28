const jwt = require('jsonwebtoken');
const { loadEnvConfig } = require('../utils');

loadEnvConfig();

const generateJWT = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30s'});
        return token;
    } catch(err) {
        console.log(err);
    }
}

const isJWTValid = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch(err) {
        console.log('🚀 ~ isJWTValid ~ err:', err);
        return false;
    }
}

module.exports = { generateJWT, isJWTValid };