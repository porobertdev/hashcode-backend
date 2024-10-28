const bcrypt = require('bcryptjs');

const hash = (text) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
};

module.exports = hash;