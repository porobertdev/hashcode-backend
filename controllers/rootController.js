const { encrypt, decrypt } = require("../authentication/encrypt");
const hash = require("../authentication/hash");
const { savePaste, getPaste } = require("../database/queries");

module.exports = {
    get: async (req, res) => {
        const { pasteID } = req.params;

        const dbResults = await getPaste(pasteID);

        if (dbResults.length !== 0) {
            // decrypt
            dbResults.code_snippet = decrypt(dbResults.code_snippet);

            res.json(dbResults[0]);
        } else {
            res.json({
                message: 'Not found.'
            });
        }

    },
    post: async (req, res) => {
        // extract payload
        const {code_snippet, language, createdAt, expiration_time} = req.body;

        // replace '/' because they mess up with the endpoint
        const hashedUrl = hash(code_snippet).replaceAll('/', '');

        // encrypt the code snippet
        const encryptedText = encrypt(code_snippet);

        // save it into database
        await savePaste(encryptedText, language, hashedUrl, createdAt, expiration_time);

        // send JSON to client    
        res.json({
            message: 'The code snippet was saved successfully!',
            url: hashedUrl
        });
    },
};
