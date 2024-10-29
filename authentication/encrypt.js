const crypto = require('node:crypto');
const { loadEnvConfig } = require('../utils');

loadEnvConfig();

// mock functions till I learn about encryption
const encrypt = (text) => {
    return 'encrypted text';
};

const decrypt = (encrypted) => {
    return 'decrypted text'
}

module.exports = { encrypt, decrypt };